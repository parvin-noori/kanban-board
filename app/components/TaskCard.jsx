import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export default function TaskCard(props) {
  const { task, deleteTask, updateTask } = props;
  const [mouseOver, setMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseOver(false);
  };

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-950 opacity-30 p-2.5 h-25 min-h-25 items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab justify-between task"
      />
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      className="bg-gray-950 p-2.5 h-25 min-h-25 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab justify-between task"
    >
      {editMode ? (
        <textarea
          value={task.title}
          className="w-full h-full outline-0 resize-none border-none rounded bg-transparent text-white focus:outline-0"
          onChange={(e) => updateTask(task.id, e.target.value)}
          autoFocus
          placeholder="task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter") toggleEditMode();
          }}
        />
      ) : (
        <>
          <p className="my-auto h-[90%] w-full overflow-x-hidden overflow-y-auto">
            {task.title}
          </p>
          {mouseOver && (
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 hover:bg-gray-900 rounded cursor-pointer opacity-60 hover:opacity-100"
            >
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

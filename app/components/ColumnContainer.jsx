import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

export default function ColumnContainer(props) {
  const {
    column,
    deleteColumn,
    updateColumn,
    createTask,
    tasks,
    deleteTask,
    updateTask,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
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
        className="bg-gray-900 opacity-60 border-2 border-rose-500 w-87.5 h-125 max-h-125 rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-900 w-87.5 h-125 max-h-125 rounded-md flex flex-col"
    >
      {/* column title  */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-gray-950 text-md h-15 cursor-grab rounded-t-md p-3 font-bold border-4 border-gray-900 items-center justify-between flex"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-gray-900 px-2 py-1 text-sm rounded-full">
            0
          </div>
          {editMode ? (
            <input
              value={column.title}
              autoFocus
              className="border focus:border-rose-500 rounded outline-none px-2"
              onBlur={() => setEditMode(false)}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          ) : (
            column.title
          )}
        </div>
        <button
          className="stroke-gray-500 hover:stroke-white hover:bg-gray-900 rounded px-1 py-2"
          onClick={() => deleteColumn(column.id)}
        >
          delete
        </button>
      </div>

      {/* column task container  */}
      <div className="flex flex-col grow gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      {/* column footer  */}
      <button
        className="flex gap-2 items-center border-2 border-gray-900 p-4 border-x-gray-900 hover:bg-gray-950 hover:text-rose-500 active:bg-black cursor-pointer"
        onClick={() => createTask(column.id)}
      >
        add task
      </button>
    </div>
  );
}

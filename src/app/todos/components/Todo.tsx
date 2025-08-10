"use client";
import { useRef, useEffect } from "react";
import { TodoType } from "@/types/todoTypes";

interface TodoProps {
  todo: TodoType;
  onSetContent: (id: number, content: string) => void;
  onEdit: (id: number) => void;
  onUpdate: (id: number, todo: TodoType) => void;
  onDone: (id: number, todo: TodoType) => void;
  onDelete: (id: number) => void;
  isNewTodo?: boolean;
}

export default function Todo({
  todo,
  onSetContent,
  onEdit,
  onUpdate,
  onDone,
  onDelete,
  isNewTodo = false,
}: TodoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 새로 생성된 todo에 포커스 주기
    if (isNewTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isNewTodo]);

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        className={`text-2xl cursor-pointer p-2 hover:opacity-100
        ${todo.isDone ? "opacity-100" : "opacity-50"}`}
        onClick={() => onDone(todo.id, todo)}
      >
        ✅
      </button>
      <div className="w-full">
        <input
          ref={inputRef}
          readOnly={!todo.isEditing}
          className={`p-2 w-full border-2 rounded-md p-1 outline-none ${
            todo.isEditing ? "cursor-text border-main" : "cursor-default border-gray-300"
          }`}
          type="text"
          value={todo.content || ""}
          onChange={(e) => onSetContent(todo.id, e.target.value)}
        />
      </div>
      <div className={`flex gap-2`}>
        <button
          className={`text-2xl cursor-pointer p-1 hover:opacity-100 ${
            todo.isEditing ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => {
            if (todo.isEditing) {
              onUpdate(todo.id, todo);
            } else {
              onEdit(todo.id);
            }
          }}
        >
          {todo.isEditing ? "💾" : "✏️"}
        </button>
        <button
          className={`text-2xl cursor-pointer p-1 opacity-50 hover:opacity-100`}
          onClick={() => onDelete(todo.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

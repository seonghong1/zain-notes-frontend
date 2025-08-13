"use client";
import { useRef, useEffect } from "react";
import { TodoType } from "@/types/todoTypes";

import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaSave } from "@react-icons/all-files/fa/FaSave";

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
    <div className="flex items-center justify-center gap-2">
      <button
        className={`cursor-pointer p-2 text-2xl text-[var(--color-done)] hover:opacity-100 ${todo.isDone ? "opacity-100" : "opacity-50"}`}
        onClick={() => onDone(todo.id, todo)}
      >
        <FaCheck />
      </button>
      <div className="w-full">
        <input
          ref={inputRef}
          readOnly={!todo.isEditing}
          className={`w-full rounded-md border-2 p-1 p-2 outline-none ${
            todo.isEditing
              ? "border-main cursor-text"
              : "cursor-default border-gray-300"
          }`}
          type="text"
          value={todo.content || ""}
          onChange={(e) => onSetContent(todo.id, e.target.value)}
        />
      </div>
      <div className={`flex gap-2`}>
        <button
          className={`cursor-pointer p-1 text-2xl hover:opacity-100 ${
            todo.isEditing
              ? "text-[var(--color-save)] opacity-50"
              : "text-[var(--color-edit)] opacity-50"
          }`}
          onClick={() => {
            if (todo.isEditing) {
              onUpdate(todo.id, todo);
            } else {
              onEdit(todo.id);
            }
          }}
        >
          {todo.isEditing ? <FaSave /> : <FaEdit />}
        </button>
        <button
          className={`cursor-pointer p-1 text-2xl text-[var(--color-delete)] opacity-50 hover:opacity-100`}
          onClick={() => onDelete(todo.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

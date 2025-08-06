"use client";
import { deleteData, getData, patchData } from "@/lib/api/httpClient";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  userId: number;
  content: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: boolean;

  isEditing?: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await getData<Todo[]>("/todos");
    setTodos(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSetContent = (id: number, content: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, content } : todo)));
  };

  const handleEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    );
  };

  const handleUpdate = async (id: number, todo: Todo) => {
    try {
      if (!confirm("수정하시겠습니까?")) return;

      delete todo.isEditing;

      const res = await patchData<Todo, Todo>(`/todos/${id}`, todo);

      setTodos(todos.map((todo) => (todo.id === id ? res : todo)));
    } catch (error) {
      alert("수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDone = async (id: number, todo: Todo) => {
    try {
      delete todo.isEditing;
      todo.isDone = !todo.isDone;

      const res = await patchData<Todo, Todo>(`/todos/${id}`, todo);
      alert("완료 상태가 변경되었습니다.");
      setTodos(todos.map((todo) => (todo.id === id ? res : todo)));
    } catch (error) {
      alert("수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      const res = await deleteData<Todo>(`/todos/${id}`);

      const filterdTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filterdTodos);
    } catch (error) {
      alert("삭제에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="flex gap-4">
            <button
              className={` cursor-pointer p-2 hover:opacity-100
                ${todo.isDone ? "opacity-100" : "opacity-50"}`}
              onClick={() => handleDone(todo.id, todo)}
            >
              ✅
            </button>
            <div>
              <input
                readOnly={!todo.isEditing}
                className={`border-2  rounded-md p-2 outline-none ${
                  todo.isEditing ? "cursor-text border-main" : "cursor-default border-gray-300"
                }`}
                type="text"
                value={todo.content}
                onChange={(e) => handleSetContent(todo.id, e.target.value)}
              />
            </div>
            <div className={`flex gap-2`}>
              <button
                className={`cursor-pointer p-2 hover:opacity-100 ${
                  todo.isEditing ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => {
                  if (todo.isEditing) {
                    handleUpdate(todo.id, todo);
                  } else {
                    handleEdit(todo.id);
                  }
                }}
              >
                {todo.isEditing ? "💾" : "✏️"}
              </button>
              <button
                className={`cursor-pointer p-2 hover:opacity-100 ${
                  todo.isEditing ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => handleDelete(todo.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

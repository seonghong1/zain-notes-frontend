"use client";
import { deleteData, getData, patchData, postData } from "@/lib/api/httpClient";
import { useEffect, useState, useRef } from "react";

interface Todo {
  id: number;
  userId?: number;
  content: string;
  isDone: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;

  isEditing?: boolean;
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoId, setNewTodoId] = useState<number | null>(null);
  const inputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

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

  // 새로 생성된 todo에 포커스 주기
  useEffect(() => {
    if (newTodoId && inputRefs.current[newTodoId]) {
      inputRefs.current[newTodoId]?.focus();
      setNewTodoId(null);
    }
  }, [newTodoId, todos]);

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

  const handleCreate = async () => {
    try {
      const res = await postData<Todo, Todo>("/todos");
      res.isEditing = true;
      setTodos([res, ...todos]);
      setNewTodoId(res.id);
    } catch (error) {
      alert("추가에 실패했습니다.");
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
    <>
      <div className="flex justify-end">
        <button
          className="text-3xl mb-3 p-1 cursor-pointer opacity-50 hover:opacity-100"
          onClick={handleCreate}
        >
          🆕
        </button>
      </div>
      <div className="flex flex-col gap-3 h-full w-full">
        {todos.map((todo) => {
          return (
            <div
              key={`${todo.id}-${todo.userId || "new"}`}
              className="flex gap-2 items-center justify-center"
            >
              <button
                className={`text-2xl cursor-pointer p-2 hover:opacity-100
                ${todo.isDone ? "opacity-100" : "opacity-50"}`}
                onClick={() => handleDone(todo.id, todo)}
              >
                ✅
              </button>
              <div className="w-full">
                <input
                  ref={(el) => {
                    inputRefs.current[todo.id] = el;
                  }}
                  readOnly={!todo.isEditing}
                  className={`p-2 w-full border-2  rounded-md p-1 outline-none ${
                    todo.isEditing ? "cursor-text border-main" : "cursor-default border-gray-300"
                  }`}
                  type="text"
                  value={todo.content || ""}
                  onChange={(e) => handleSetContent(todo.id, e.target.value)}
                />
              </div>
              <div className={`flex gap-2`}>
                <button
                  className={`text-2xl cursor-pointer p-1 hover:opacity-100 ${
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
                  className={`text-2xl cursor-pointer p-1 opacity-50 hover:opacity-100`}
                  onClick={() => handleDelete(todo.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

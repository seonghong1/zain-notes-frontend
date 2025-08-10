"use client";
import { deleteData, getData, patchData, postData } from "@/lib/api/httpClient";
import { useEffect, useState } from "react";
import DateFilter from "../components/searchFilters/DateFilter";
import Todo from "./components/Todo";
import { getCurrentDate } from "@/lib/utils/date";
import { TodoType } from "@/types/todoTypes";

interface SearchCondition {
  date: string;
}

export default function Todos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoId, setNewTodoId] = useState<number | null>(null);

  const [serchCondition, setSerchCondition] = useState<SearchCondition>({
    date: getCurrentDate(),
  });

  const fetchTodos = async () => {
    let url = "/todos";

    url += `?date=${serchCondition.date}`;
    const res = await getData<TodoType[]>(url);
    setTodos(res);
  };

  // 검색 조건이 변경되면 투두 목록 다시 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [serchCondition]);

  // 새로 생성된 todo에 포커스 주기
  useEffect(() => {
    if (newTodoId) {
      setNewTodoId(null);
    }
  }, [newTodoId]);

  const handleSetContent = (id: number, content: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, content } : todo)),
    );
  };

  const handleEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
      ),
    );
  };

  const handleUpdate = async (id: number, todo: TodoType) => {
    try {
      if (!confirm("수정하시겠습니까?")) return;

      delete todo.isEditing;

      const res = await patchData<TodoType, TodoType>(`/todos/${id}`, todo);
      setTodos(todos.map((todo) => (todo.id === id ? res : todo)));
    } catch (error) {
      alert("수정에 실패했습니다.");
      console.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await postData<TodoType, TodoType>("/todos");
      res.isEditing = true;
      setTodos([res, ...todos]);
      setNewTodoId(res.id);
    } catch (error) {
      alert("추가에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDone = async (id: number, todo: TodoType) => {
    try {
      delete todo.isEditing;
      todo.isDone = !todo.isDone;

      const res = await patchData<TodoType, TodoType>(`/todos/${id}`, todo);
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

      const res = await deleteData<TodoType>(`/todos/${id}`);

      const filterdTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filterdTodos);
    } catch (error) {
      alert("삭제에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <DateFilter<SearchCondition>
          serchCondition={serchCondition}
          setSerchCondition={setSerchCondition}
        />
        <button
          className="cursor-pointer p-1 text-3xl opacity-50 hover:opacity-100"
          onClick={handleCreate}
        >
          🆕
        </button>
      </div>
      <div className="flex h-full w-full flex-col gap-3">
        {todos.map((todo) => (
          <Todo
            key={`${todo.id}-${todo.userId || "new"}`}
            todo={todo}
            onSetContent={handleSetContent}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
            onDone={handleDone}
            onDelete={handleDelete}
            isNewTodo={todo.id === newTodoId}
          />
        ))}
      </div>
    </>
  );
}

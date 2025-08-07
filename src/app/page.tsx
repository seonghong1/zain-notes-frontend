"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className="bg-main text-white p-2 rounded-md cursor-pointer hover:bg-main-dark"
        onClick={() => navigate("/notes")}
      >
        Notes
      </button>
      <button
        className="bg-main text-white p-2 rounded-md cursor-pointer hover:bg-main-dark"
        onClick={() => navigate("/todos")}
      >
        Todos
      </button>
    </div>
  );
}

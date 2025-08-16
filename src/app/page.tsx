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
        className="bg-main hover:bg-main-dark cursor-pointer rounded-md p-2 text-white"
        onClick={() => navigate("/notes")}
      >
        Notes
      </button>
      <button
        className="bg-main hover:bg-main-dark cursor-pointer rounded-md p-2 text-white"
        onClick={() => navigate("/todos")}
      >
        Todos
      </button>
    </div>
  );
}

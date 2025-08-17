"use client";
import { NoteType } from "@/types/noteTypes";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { deleteData, getData, patchData, postData } from "@/lib/api/httpClient";
import { useRouter } from "next/navigation";

import AIAssistantButton from "@/app/components/buttons/AIAssistantButton";

import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

function NotesDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [note, setNote] = useState<NoteType | null>(null);

  const defaultNote = useMemo(
    (): NoteType => ({
      id: "",
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      isDeleted: false,
      isEditing: true,
    }),
    [],
  );

  const fetchNote = useCallback(async () => {
    if (!id) return;
    const res = await getData<NoteType>(`/notes/${id}`);

    res.isEditing = false;
    setNote(res);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setNote(defaultNote);
      return;
    }

    fetchNote();
  }, [id, fetchNote]);

  const handleEdit = () => {
    if (!note) return;

    setNote({ ...note, isEditing: true });
  };

  const handleSave = async () => {
    try {
      if (!note) return;
      const url = note.id ? `/notes/${note.id}` : `/notes`;
      const res = note.id
        ? await patchData<NoteType, NoteType>(url, note)
        : await postData<NoteType, NoteType>(url, note);

      setNote(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (!note) return;
    setNote({ ...note, isEditing: false });
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await deleteData<NoteType>(`/notes/${note.id}`);
      router.push("/notes");
    } catch (error) {
      console.error(error);
    }
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!note) return;
    setNote({ ...note, title: e.target.value });
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!note) return;
    setNote({ ...note, content: e.target.value });
  };

  const handleAIAssistant: () => Promise<string> = async () => {
    try {
      const url = `/notes/${note?.id}/ai-process`;
      const res: string = await getData<string>(url);
      return res || "";
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-2">
      {note?.id && (
        <div className="absolute right-0 bottom-0 z-10">
          <AIAssistantButton
            onAction={handleAIAssistant}
            label="정리, 요약하기"
          />
        </div>
      )}
      <input
        className={`w-3/4 cursor-default p-2 text-2xl outline-none ${
          note?.isEditing
            ? "cursor-text rounded-md border-2 border-gray-300"
            : "cursor-default border-b-2 border-gray-300"
        } `}
        type="text"
        value={note?.title || ""}
        readOnly={!note?.isEditing}
        onChange={changeTitle}
      />
      <textarea
        className={`h-full w-3/4 cursor-default resize-none overflow-y-auto rounded-md p-2 outline-none ${
          note?.isEditing
            ? "cursor-text border-2 border-gray-300"
            : "cursor-default"
        }`}
        value={note?.content || ""}
        readOnly={!note?.isEditing}
        onChange={changeContent}
      />

      <div className="flex gap-2">
        {note?.isEditing ? (
          <button
            className="cursor-pointer rounded-md bg-[var(--color-save)] px-4 py-3 text-xl text-white opacity-70 hover:opacity-100"
            onClick={() => handleSave()}
          >
            <FaSave />
          </button>
        ) : (
          <button
            className="cursor-pointer rounded-md bg-[var(--color-edit)] px-4 py-3 text-xl text-white opacity-70 hover:opacity-100"
            onClick={() => handleEdit()}
          >
            <FaEdit />
          </button>
        )}
        <button
          className="cursor-pointer rounded-md bg-[var(--color-delete)] px-4 py-3 text-xl text-white opacity-70 hover:opacity-100"
          onClick={() => handleDelete()}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default function NotesDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesDetailContent />
    </Suspense>
  );
}

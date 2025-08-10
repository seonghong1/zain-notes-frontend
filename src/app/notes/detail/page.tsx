"use client";
import { NoteType } from "@/types/noteTypes";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { deleteData, getData, patchData, postData } from "@/lib/api/httpClient";
import { useRouter } from "next/navigation";

export default function NotesDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [note, setNote] = useState<NoteType | null>(null);

  const defaultNote: NoteType = {
    id: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
    isDeleted: false,

    isEditing: true,
  };

  const fetchNote = async () => {
    const res = await getData<NoteType>(`/notes/${id}`);
    console.log(res);

    res.isEditing = false;
    setNote(res);
  };

  useEffect(() => {
    if (!id) {
      setNote(defaultNote);
      return;
    }

    fetchNote();
  }, [id]);

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
      const res = await deleteData<NoteType>(`/notes/${note.id}`);

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-full w-full flex-col items-center gap-2">
        <input
          className={`w-3/4 cursor-default rounded-md p-2 outline-none ${
            note?.isEditing
              ? "cursor-text border-2 border-gray-300"
              : "cursor-default"
          } `}
          type="text"
          value={note?.title || ""}
          readOnly={!note?.isEditing}
          onChange={changeTitle}
        />
        <textarea
          className="h-full w-3/4 cursor-default resize-none overflow-y-auto rounded-md border-2 border-gray-300 p-2 outline-none"
          value={note?.content || ""}
          readOnly={!note?.isEditing}
          onChange={changeContent}
        />

        <div className="flex gap-2">
          {note?.isEditing ? (
            <>
              <button
                className="bg-main rounded-md p-2 text-white"
                onClick={() => handleSave()}
              >
                저장
              </button>
              <button
                className="bg-main rounded-md p-2 text-white"
                onClick={() => handleCancel()}
              >
                취소
              </button>
            </>
          ) : (
            <button
              className="bg-main rounded-md p-2 text-white"
              onClick={() => handleEdit()}
            >
              수정
            </button>
          )}
          <button
            className="bg-main rounded-md p-2 text-white"
            onClick={() => handleDelete()}
          >
            삭제
          </button>
        </div>
      </div>
    </Suspense>
  );
}

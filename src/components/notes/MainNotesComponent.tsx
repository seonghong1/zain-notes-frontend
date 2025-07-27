"use client";
import { useEffect, useState } from "react";
import NoteComponent from "./NoteComponent";
import NoteListComponent from "./NoteList.component";
import { getData } from "@/lib/api/httpClient";
import { Note } from "@/types/noteTypes";

export default function MainNotesComponent() {
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    const response = await getData("/notes");
    console.log(response);
    setNotes(response);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="flex bg-white w-5xl min-h-3/4 max-h-3/4">
      <NoteListComponent notes={notes} getNotes={getNotes} />
      <NoteComponent />
    </div>
  );
}

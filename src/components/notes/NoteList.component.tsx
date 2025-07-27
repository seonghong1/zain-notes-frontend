import { Note } from "@/types/noteTypes";

export default function NoteListComponent({
  notes,
  // getNotes,
}: {
  notes: Note[];
  // getNotes: () => void;
}) {
  return (
    <div className="">
      {notes.map((note: Note) => (
        <div key={note.id}>
          <div>{note.title}</div>
          <div>{note.content}</div>
        </div>
      ))}
    </div>
  );
}

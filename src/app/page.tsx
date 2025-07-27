import NotesComponent from "@/components/notes/MainNotesComponent";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Zain Notes</h1>
      <NotesComponent />
    </div>
  );
}

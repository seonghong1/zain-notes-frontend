export interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;

  isEditing?: boolean;
}

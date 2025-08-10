export interface TodoType {
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

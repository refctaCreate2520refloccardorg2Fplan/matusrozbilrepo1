export interface TasksDTO {
  id: number;
  name: string;
  description: string;
  priority: number;
  isDone: boolean;
  deadline: Date;
  userId: string;
}

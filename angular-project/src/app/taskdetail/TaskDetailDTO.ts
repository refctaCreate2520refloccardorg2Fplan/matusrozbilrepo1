export class TaskDetailDTO{
    id: number;
    name: string;
    description: string;
    priority: number;
    isDone?: boolean;
    deadline?: Date;
    imageUrl?: string;
}
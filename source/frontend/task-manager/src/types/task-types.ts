export type createTaskType = {
  title: string;
  description?: string;
  status: 'complete' | 'in-progress' | 'to-do';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags: string[];
}


export type updateTaskType = {
  id: string;
  title?: string;
  description?: string;
  status?: 'complete' | 'in-progress' | 'to-do';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
}

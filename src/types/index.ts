export interface TaskBase {
  id: string
  isCompleted: boolean
  title: string
}

export type Subtask = TaskBase

export interface Tasks extends TaskBase {
  dueDate?: string
  priority: 'high' | 'medium' | 'low'
  progress: number
  subTasks?: Subtask[]
  description?: string
}

export interface PageProps {
  params: { action: string }
}

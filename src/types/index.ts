export interface TaskBase {
  id: string
  isCompleted: boolean
  title: string
}

export type Subtask = TaskBase

export interface Tasks extends TaskBase {
  priority: 'high' | 'medium' | 'low'
  progress: number
  subtasks?: Subtask[]
  description?: string
}

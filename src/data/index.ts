import { Subtask, Tasks } from '@/types'

let tasks: Tasks[] = []

export const getTasks = () => tasks

export const addTask = (task: Tasks) => {
  tasks.push(task)
}

export const deleteTask = (id: string) => {
  tasks = tasks.filter((task) => task.id !== id)
}

export const updateTask = (
  id: string,
  title: string,
  dueDate: string,
  isCompleted: boolean,
  priority: 'high' | 'medium' | 'low',
  progress: number,
  subTasks: Subtask[],
  description: string,
) => {
  const task = tasks.find((task) => task.id === id)

  if (task) {
    task.title = title
    task.dueDate = dueDate
    task.isCompleted = isCompleted
    task.priority = priority
    task.progress = progress
    task.subTasks = subTasks
    task.description = description
  } else throw new Error('Task not found')
}

export const getTaskById = (id: string) => tasks.find((task) => task.id === id)

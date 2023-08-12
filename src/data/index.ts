import { Subtask, Tasks } from '@/types'

let tasks: Tasks[] = [
  {
    id: '1',
    isCompleted: false,
    title: 'UI/UX App Design',
    priority: 'high',
    progress: 75,
    subtasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'UI Design',
      },
    ],
  },
  {
    id: '2',
    isCompleted: false,
    title: "View candidate's resumes",
    priority: 'high',
    progress: 50,
  },
  {
    id: '3',
    isCompleted: false,
    title: 'Football Cup training Drybling',
    priority: 'low',
    progress: 25,
    subtasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'Drybling',
      },
    ],
  },
  {
    id: '4',
    isCompleted: false,
    title: 'Study Next.js Routing',
    priority: 'medium',
    progress: 50,
  },
  {
    id: '5',
    isCompleted: false,
    title: 'Build Todo App',
    priority: 'high',
    progress: 25,
    subtasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'Todo App',
      },
    ],
  },
  {
    id: '6',
    isCompleted: false,
    title: 'Call Mark to define project',
    priority: 'medium',
    progress: 0,
  },
]

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
  isCompleted: boolean,
  priority: 'high' | 'medium' | 'low',
  progress: number,
  subtasks: Subtask[],
) => {
  const task = tasks.find((task) => task.id === id)

  if (task) {
    task.title = title
    task.isCompleted = isCompleted
    task.priority = priority
    task.progress = progress
    task.subtasks = subtasks
  } else throw new Error('Task not found')
}

export const getTaskById = (id: string) => tasks.find((task) => task.id === id)
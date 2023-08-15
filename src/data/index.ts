import { Subtask, Tasks } from '@/types'

let tasks: Tasks[] = [
  {
    id: '1',
    title: 'UI/UX App Design',
    dueDate: '2022-01-01',
    isCompleted: false,
    priority: 'high',
    progress: 75,
    subTasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'UI Design',
      },
    ],
    description:
      "First I have to animate the logo and later prototyping my design. It's very important.",
  },
  {
    id: '2',
    title: "View candidate's resumes",
    isCompleted: false,
    priority: 'high',
    progress: 50,
    description: 'Check the hr email for the candidates',
  },
  {
    id: '3',
    title: 'Football Cup training Drybling',
    isCompleted: false,
    priority: 'low',
    progress: 25,
    subTasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'Drybling',
      },
    ],
  },
  {
    id: '4',
    title: 'Study Next.js Routing',
    dueDate: '2022-06-01',
    isCompleted: false,
    priority: 'medium',
    progress: 50,
    description: 'Get video examples',
  },
  {
    id: '5',
    title: 'Build Todo App',
    isCompleted: false,
    priority: 'high',
    progress: 25,
    subTasks: [
      {
        id: '1',
        isCompleted: false,
        title: 'Todo App',
      },
    ],
    description: 'Create app structure.',
  },
  {
    id: '6',
    title: 'Call Mark to define project',
    isCompleted: false,
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

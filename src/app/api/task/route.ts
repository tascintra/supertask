interface Task {
  id: number
  isCompleted: boolean
  title: string
}

type Subtask = Task

interface TasksList extends Task {
  priority: 'high' | 'medium' | 'low'
  progress: number
  subtasks?: Subtask[]
}

let tasks: TasksList[] = []
// let tasks: TasksList[] = [
//   {
//     id: '1',
//     isCompleted: false,
//     title: 'UI/UX App Design',
//     priority: 'high',
//     progress: 75,
//     subtasks: [
//       {
//         id: '1',
//         isCompleted: false,
//         title: 'UI Design',
//       },
//     ],
//   },
//   {
//     id: '2',
//     isCompleted: false,
//     title: "View candidate's resumes",
//     priority: 'high',
//     progress: 50,
//   },
//   {
//     id: '3',
//     isCompleted: false,
//     title: 'Football Cup training Drybling',
//     priority: 'low',
//     progress: 25,
//     subtasks: [
//       {
//         id: '1',
//         isCompleted: false,
//         title: 'Drybling',
//       },
//     ],
//   },
//   {
//     id: '4',
//     isCompleted: false,
//     title: 'Study Next.js Routing',
//     priority: 'medium',
//     progress: 50,
//   },
//   {
//     id: '5',
//     isCompleted: false,
//     title: 'Build Todo App',
//     priority: 'high',
//     progress: 25,
//     subtasks: [
//       {
//         id: '1',
//         isCompleted: false,
//         title: 'Todo App',
//       },
//     ],
//   },
//   {
//     id: '6',
//     isCompleted: false,
//     title: 'Call Mark to define project',
//     priority: 'medium',
//     progress: 0,
//   },
// ]

export async function GET() {
  return new Response(JSON.stringify(tasks))
}

export async function POST(request: Request) {
  const data = await request.json()
  tasks.push(data)
  return new Response(JSON.stringify(tasks))
}

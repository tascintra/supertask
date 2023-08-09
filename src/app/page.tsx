import { Button } from '@/components/Atoms'
import { Header } from '@/components/Molecules'
import { TaskCard } from '@/components/Organisms'
import { ArrowUpDown } from 'lucide-react'

interface tasksList {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
  progress: number
}

const tasksList: tasksList[] = [
  {
    id: '1',
    title: 'UI/UX App Design',
    priority: 'high',
    progress: 75,
  },
  {
    id: '2',
    title: "View candidate's resumes",
    priority: 'high',
    progress: 50,
  },
  {
    id: '3',
    title: 'Football Cup training Drybling',
    priority: 'low',
    progress: 25,
  },
  {
    id: '4',
    title: 'Study Next.js Routing',
    priority: 'medium',
    progress: 50,
  },
  {
    id: '5',
    title: 'Build Todo App',
    priority: 'high',
    progress: 25,
  },
  {
    id: '6',
    title: 'Call Mark to define project',
    priority: 'medium',
    progress: 0,
  },
]

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-between divide-y divide-neutral-200 rounded-3xl border-zinc-200 sm:my-20 sm:border sm:shadow-sm">
      <Header />
      <section className="mb-auto flex h-full w-full flex-col items-center gap-3 p-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold">Tasks list</p>
          <Button color="icon" className="py-2">
            <ArrowUpDown size={16} strokeWidth={3} />
          </Button>
        </div>
        <div className="mb-auto flex w-full flex-col gap-4">
          {tasksList.map(({ id, title, priority, progress }) => (
            <TaskCard
              key={id}
              title={title}
              progress={progress}
              priority={priority}
            />
          ))}
        </div>
      </section>
      <Button className="mb-5 max-w-[232px] self-center">Create task</Button>
    </main>
  )
}

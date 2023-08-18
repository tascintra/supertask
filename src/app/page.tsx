'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Tasks } from '@/types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/Atoms'
import { Header } from '@/components/Molecules'
import { TaskCard } from '@/components/Organisms'

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const router = useRouter()

  function getTasks() {
    axios.get('/api/tasks').then(({ data: json }) => setTasks(json))
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main className="mx-auto flex h-screen w-full max-w-2xl flex-col justify-between divide-y divide-neutral-200 rounded-3xl border-neutral-200 dark:divide-dark-300 dark:border-dark-400 sm:my-20 sm:border sm:shadow-sm md:h-full md:min-h-[888px]">
      <Header />
      <section className="mb-auto flex h-full w-full flex-col items-center gap-3 p-5">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold">Tasks list</p>
          <Button color="icon">
            <ArrowUpDown size={16} strokeWidth={3} />
          </Button>
        </div>
        <div className="mb-auto flex w-full flex-col gap-4">
          {tasks.map(
            ({ id, title, priority, progress, subTasks, isCompleted }) => (
              <TaskCard
                key={id}
                title={title}
                progress={progress}
                priority={priority}
                subTasks={subTasks}
                isCompleted={isCompleted}
                onClick={() => router.push(`/task/edit/${id}`)}
              />
            ),
          )}
        </div>
      </section>
      <Button
        onClick={() => router.push('/task/create')}
        className="mb-5 max-w-[232px] self-center"
      >
        Create task
      </Button>
    </main>
  )
}

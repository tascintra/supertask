'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Tasks } from '@/types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/Atoms'
import { Header } from '@/components/Molecules'
import { Modal, TaskCard } from '@/components/Organisms'

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [tasks, setTasks] = useState<Tasks[]>([])

  function getTasks() {
    axios.get('/api/tasks').then(({ data: json }) => setTasks(json))
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <Modal showModal={showModal} />
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
            {tasks.map(({ id, title, priority, progress, subtasks }) => (
              <TaskCard
                key={id}
                title={title}
                progress={progress}
                priority={priority}
                subtasks={subtasks}
                onClick={() => setShowModal(true)}
              />
            ))}
          </div>
        </section>
        <Button className="mb-5 max-w-[232px] self-center">Create task</Button>
      </main>
    </>
  )
}

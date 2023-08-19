'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { Tasks } from '@/types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/Atoms'
import { Header } from '@/components/Molecules'
import { TaskCard } from '@/components/Organisms'

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([])
  const [canDnd, setCanDnd] = useState(false)
  const router = useRouter()

  function getTasks() {
    axios.get('/api/tasks').then(({ data: json }) => setTasks(json))
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return
    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    result.destination &&
      items.splice(result.destination.index, 0, reorderedItem)

    setTasks(items)
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
          <div className="flex w-10 items-center justify-center">
            <input
              type="checkbox"
              id="allow"
              onChange={() => setCanDnd(!canDnd)}
              className="peer z-10 appearance-none"
            />
            <label
              htmlFor="allow"
              className="flex w-full max-w-[40px] cursor-pointer justify-center rounded-full border border-neutral-900 bg-neutral-800 py-2 text-base font-medium text-neutral-50 shadow-component transition hover:bg-neutral-950 peer-checked:border-green-500 peer-checked:bg-green-500 dark:shadow-neutral-900"
            >
              <ArrowUpDown size={16} strokeWidth={3} />
            </label>
          </div>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mb-auto flex w-full flex-col gap-4"
              >
                {tasks.map(
                  (
                    { id, title, priority, progress, subTasks, isCompleted },
                    index,
                  ) => (
                    <Draggable
                      key={id}
                      draggableId={id}
                      index={index}
                      isDragDisabled={!canDnd}
                    >
                      {(provided) => (
                        <TaskCard
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          title={title}
                          progress={progress}
                          priority={priority}
                          subTasks={subTasks}
                          isCompleted={isCompleted}
                          onClick={() => router.push(`/task/edit/${id}`)}
                        />
                        // <li
                        //   className="h-24 w-full border bg-white"
                        //   {...provided.draggableProps}
                        //   {...provided.dragHandleProps}
                        //   ref={provided.innerRef}
                        // >
                        //   Teste {index}
                        // </li>
                      )}
                    </Draggable>
                  ),
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
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

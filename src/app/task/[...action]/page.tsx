'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useFieldArray, useForm } from 'react-hook-form'
import { ChevronLeft, MoreVertical, X } from 'lucide-react'
import { PageProps, Tasks } from '@/types'
import { Button } from '@/components/Atoms'
import { Checkbox, Input, Radio, Textarea } from '@/components/Molecules'

export default function Page({ params }: PageProps) {
  const subTaskName = useRef<HTMLInputElement>(null)
  const subTaskCompleted = useRef<HTMLInputElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { register, control, setValue, getValues, handleSubmit } =
    useForm<Tasks>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'subTasks',
  })
  const router = useRouter()
  const taskId = params.action.slice(-1).toString()

  const setTaskData = useCallback(
    (data: Tasks) => {
      setValue('title', data.title)
      setValue('dueDate', data.dueDate)
      setValue('priority', data.priority)
      setValue('subTasks', data.subTasks)
      setValue('description', data.description)
    },
    [setValue],
  )

  const getTaskById = useCallback(
    (id: string) => {
      axios.get(`/api/tasks/${id}`).then(({ data: { task } }) => {
        setTaskData(task)
      })
    },
    [setTaskData],
  )

  const handleDeleteTask = () => {
    axios.delete(`/api/tasks/${taskId}`).then(() => {
      router.push('/')
    })
  }

  const handleMarkCompleted = () => {
    const data = getValues()

    if (data.subTasks?.length) {
      data.subTasks.forEach((subTask) => {
        subTask.isCompleted = true
      })
      data.isCompleted = true
      data.progress = 100
    }

    axios.put(`/api/tasks/${taskId}`, data)
    router.push('/')
  }

  useEffect(() => {
    params.action.includes('edit') && getTaskById(taskId)
  }, [taskId, params.action, getTaskById])

  const handleSubTasks = () => {
    subTaskName.current?.value &&
      append({
        id: Date.now().toString(),
        title: subTaskName.current.value,
        isCompleted: false,
      })
    subTaskName.current && (subTaskName.current.value = '')
    subTaskName.current?.focus()
  }

  const handleFormSubmit = (data: Tasks) => {
    const totalSubTasks = data.subTasks?.length || 0
    let completedSubTasks = 0
    if (data.subTasks?.length) {
      data.subTasks.forEach((subTask) => {
        if (subTask.isCompleted) {
          completedSubTasks++
        }
      })
      data.isCompleted = completedSubTasks === totalSubTasks
      data.progress = Number(
        ((completedSubTasks / totalSubTasks) * 100).toFixed(),
      )
    } else {
      data.isCompleted = false
      data.progress = 0
    }

    if (params.action.includes('create')) axios.post('/api/tasks', data)

    if (params.action.includes('edit')) axios.put(`/api/tasks/${taskId}`, data)

    router.push('/')
  }

  return (
    <main className="mx-auto flex h-screen w-full max-w-2xl flex-col gap-5 divide-y divide-neutral-200 rounded-3xl border-neutral-200 py-8 dark:divide-dark-300 dark:border-dark-400 dark:shadow-neutral-900 sm:my-20 sm:border sm:shadow-md dark:sm:shadow-component md:h-fit">
      <header className="relative px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block">
            <ChevronLeft
              size={48}
              className="-ml-3 rounded-lg stroke-primary-900 hover:bg-neutral-400/20"
            />
          </Link>
          {params.action.includes('edit') && (
            <>
              <button
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                id="dropdownMenuIconButton"
                data-dropdown-toggle="dropdownDots"
                className="inline-flex items-center rounded-lg p-2 text-center text-sm font-medium hover:bg-neutral-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-inherit dark:text-neutral-200 dark:hover:bg-dark-600 dark:focus:ring-dark-600"
                type="button"
              >
                <MoreVertical />
              </button>

              {menuIsOpen && (
                <div
                  id="dropdownDots"
                  className="absolute right-5 top-12 z-10 w-44 divide-y divide-neutral-100 rounded-lg bg-white shadow dark:divide-dark-300 dark:bg-dark-400 dark:shadow-neutral-900"
                >
                  <ul
                    className="py-2 text-sm"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <button
                        onClick={handleMarkCompleted}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-500 dark:hover:text-white"
                      >
                        Mark as completed
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDeleteTask}
                        className="block w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-dark-500 dark:hover:text-white"
                      >
                        Delete task
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
        <h3 className="mt-2 text-center text-3xl font-semibold">
          {params.action.includes('create') && 'Create new task'}
          {params.action.includes('edit') && 'Edit task'}
        </h3>
      </header>
      <section className="h-full px-5">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-5 flex h-full flex-col gap-5 md:h-fit"
        >
          <Input
            {...register('title')}
            inputLabel="Main task name"
            type="text"
            name="title"
          />
          <Input {...register('dueDate')} inputLabel="Date due" type="date" />

          <fieldset className="flex gap-4">
            <legend className="mb-2 pl-4 text-sm font-semibold text-primary-900">
              Choose priority
            </legend>
            <Radio
              {...register('priority')}
              radioLabel="High"
              value="high"
              color="critical"
            />
            <Radio
              {...register('priority')}
              radioLabel="Medium"
              value="medium"
              color="attention"
            />
            <Radio
              {...register('priority')}
              radioLabel="Low"
              value="low"
              color="success"
            />
          </fieldset>

          <Input
            ref={subTaskName}
            inputLabel="Sub-task name"
            type="text"
            name="subtasks"
          />
          <Button
            onClick={handleSubTasks}
            type="button"
            color="secondary"
            className="max-w-[224px]"
          >
            Add sub-task
          </Button>

          {fields.length > 0 && (
            <ul className="divide-y divide-neutral-200 overflow-hidden rounded-2xl border border-neutral-200 shadow-component dark:divide-dark-400 dark:border-dark-400 dark:bg-dark-700">
              {fields.map((f, index) => (
                <li
                  key={f.id}
                  className="flex w-full items-center gap-1 px-4 py-2 transition hover:bg-neutral-100 dark:shadow-neutral-900 dark:hover:bg-dark-500"
                >
                  <Checkbox
                    cbLabel={f.title}
                    checked={f.isCompleted}
                    id={f.id}
                    ref={subTaskCompleted}
                    onChange={({ target }) => {
                      update(index, { ...f, isCompleted: target.checked })
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="ml-auto text-red-500"
                    color="iconSm"
                  >
                    <X size={12} />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <Textarea {...register('description')} textareaLabel="Description" />

          <Button
            type="submit"
            color="confirm"
            className="mx-auto mb-5 mt-auto max-w-[224px] md:mt-7"
          >
            {params.action.includes('create') && 'Add task'}
            {params.action.includes('edit') && 'Edit task'}
          </Button>
        </form>
      </section>
    </main>
  )
}

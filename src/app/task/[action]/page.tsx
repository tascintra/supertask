'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useFieldArray, useForm } from 'react-hook-form'
import { ChevronLeft, X } from 'lucide-react'
import { PageProps, Tasks } from '@/types'
import { Button } from '@/components/Atoms'
import { Checkbox, Input, Radio, Textarea } from '@/components/Molecules'

export default function Page({ params }: PageProps) {
  const subTaskName = useRef<HTMLInputElement>(null)
  const subTaskCompleted = useRef<HTMLInputElement>(null)
  const { register, control, handleSubmit } = useForm<Tasks>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'subTasks',
  })
  const router = useRouter()

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
    console.log('data', data)
    axios.post('/api/tasks', data)
    router.push('/')
  }

  return (
    <main className="mx-auto flex h-screen w-full max-w-2xl flex-col gap-5 divide-y divide-neutral-200 rounded-3xl border-zinc-200 py-8 dark:divide-dark-300 sm:my-20 sm:border sm:shadow-sm md:h-fit">
      <header className="px-5">
        <Link href="/" className="inline-block">
          <ChevronLeft
            size={48}
            className="-ml-3 rounded-lg stroke-primary-900 hover:bg-neutral-400/20"
          />
        </Link>
        <h3 className="mt-2 text-center text-3xl font-semibold">
          {params.action === 'create' && 'Create new task'}
          {params.action === 'edit' && 'Edit task'}
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
            {params.action === 'create' && 'Add task'}
            {params.action === 'edit' && 'Edit task'}
          </Button>
        </form>
      </section>
    </main>
  )
}

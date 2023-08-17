'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { ChevronLeft, X } from 'lucide-react'
import { PageProps, Tasks } from '@/types'
import { Button } from '@/components/Atoms'
import { Input, Radio, Textarea } from '@/components/Molecules'

export default function Page({ params }: PageProps) {
  const subTaskName = useRef<HTMLInputElement>(null)
  const subTaskCompleted = useRef<HTMLInputElement>(null)
  const { register, control, handleSubmit } = useForm<Tasks>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'subTasks',
  })

  const formSubmit = (data: Tasks) => {
    console.log(data)
  }

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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-5 divide-y divide-neutral-200 rounded-3xl border-zinc-200 py-8 dark:divide-dark-300 sm:my-20 sm:border sm:shadow-sm">
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
          onSubmit={handleSubmit(formSubmit)}
          className="mt-5 flex flex-col gap-5"
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
                  className="flex w-full gap-1 px-4 py-2 hover:bg-neutral-100 dark:shadow-neutral-900 dark:hover:bg-dark-500"
                >
                  <input
                    type="checkbox"
                    checked={f.isCompleted}
                    name={f.title}
                    id={f.title}
                    ref={subTaskCompleted}
                    onChange={({ target }) => {
                      update(index, { ...f, isCompleted: target.checked })
                    }}
                  />
                  <label htmlFor={f.title}>{f.title}</label>
                  <button
                    onClick={() => remove(index)}
                    type="button"
                    className="ml-auto p-1 text-xs font-semibold leading-none text-red-500"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Textarea {...register('description')} textareaLabel="Description" />

          <Button
            type="submit"
            color="confirm"
            className="mx-auto mt-7 max-w-[224px]"
          >
            {params.action === 'create' && 'Add task'}
            {params.action === 'edit' && 'Edit task'}
          </Button>
        </form>
      </section>
    </main>
  )
}

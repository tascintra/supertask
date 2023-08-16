'use client'
import axios from 'axios'
import { useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

interface Subtasks {
  id: string
  subTask: string
  isCompleted: boolean
}

interface DataType {
  title: string
  dueDate: string
  isCompleted: boolean
  progress: number
  priority: 'high' | 'medium' | 'low'
  subTasks?: Subtasks[]
  description?: string
}

export default function Form() {
  const subTaskName = useRef<HTMLInputElement>(null)
  const subTaskCompleted = useRef<HTMLInputElement>(null)

  const { register, control, handleSubmit } = useForm<DataType>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'subTasks',
  })

  const handleSubTasks = () => {
    subTaskName.current?.value &&
      append({
        id: Date.now().toString(),
        subTask: subTaskName.current.value,
        isCompleted: false,
      })
    subTaskName.current && (subTaskName.current.value = '')
    subTaskName.current?.focus()
  }

  const handleFormSubmit = (data: DataType) => {
    const totalSubTasks = data.subTasks?.length || 0
    let completedSubTasks = 0
    if (data.subTasks?.length) {
      data.subTasks.forEach((subTask) => {
        if (subTask.isCompleted) {
          completedSubTasks++
        }
      })
      data.isCompleted = completedSubTasks === totalSubTasks
      data.progress = Number(((completedSubTasks / totalSubTasks) * 100).toFixed())
    } else {
      data.isCompleted = false
      data.progress = 0
    }
    console.log('data', data)
    axios.post('/api/tasks', data)
  }

  return (
    <main>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mx-auto mt-20 flex max-w-sm flex-col gap-5 px-4"
      >
        <input
          {...register('title')}
          type="text"
          placeholder="Main task name"
          className="rounded border px-2 py-1"
        />
        <input
          {...register('dueDate')}
          type="date"
          className="rounded border px-2 py-1"
        />
        <fieldset className="flex gap-4">
          <legend className="font-semibold">Priority</legend>
          <div className="flex gap-1">
            <input
              {...register('priority')}
              type="radio"
              id="high"
              value="high"
            />
            <label htmlFor="high">High</label>
          </div>
          <div className="flex gap-1">
            <input
              {...register('priority')}
              type="radio"
              id="medium"
              value="medium"
            />
            <label htmlFor="medium">Medium</label>
          </div>
          <div className="flex gap-1">
            <input
              {...register('priority')}
              type="radio"
              id="low"
              value="low"
            />
            <label htmlFor="low">Low</label>
          </div>
        </fieldset>
        <input
          ref={subTaskName}
          type="text"
          placeholder="Sub-task name"
          className="rounded border px-2 py-1"
        />
        <button
          type="button"
          onClick={handleSubTasks}
          className="rounded border bg-primary-200 py-1 font-semibold text-white"
        >
          Add sub-task
        </button>

        {fields.length > 0 && (
          <ul className="divide-y rounded border">
            {fields.map((f, index) => (
              <li
                key={f.id}
                className="flex w-full gap-1 p-2 hover:bg-zinc-100"
              >
                <input
                  type="checkbox"
                  checked={f.isCompleted}
                  name={f.subTask}
                  id={f.subTask}
                  ref={subTaskCompleted}
                  onChange={({ target }) => {
                    update(index, { ...f, isCompleted: target.checked })
                  }}
                />
                <label htmlFor={f.subTask}>{f.subTask}</label>
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="ml-auto text-xs font-semibold leading-none text-red-500 p-1"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        )}

        <textarea
          {...register('description')}
          id="description"
          placeholder="Description"
          cols={30}
          rows={5}
          className="rounded border px-2 py-1"
        />
        <button
          type="submit"
          className="rounded border bg-primary-900 py-1 font-semibold text-white"
        >
          Add task
        </button>
      </form>
    </main>
  )
}

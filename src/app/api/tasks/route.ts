import { NextResponse } from 'next/server'
import { addTask, getTasks } from '@/data'
import { Tasks } from '@/types'

export async function GET() {
  try {
    const tasks = getTasks()
    return NextResponse.json(tasks, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error', error },
      {
        status: 500,
      },
    )
  }
}

export async function POST(request: Request) {
  const { title, isCompleted, priority, subtasks, description } = await request.json()
  try {
    const task: Tasks = {
      id: Date.now().toString(),
      title,
      isCompleted: false,
      priority,
      progress: 0,
      subtasks: subtasks.map((subtaskTitle: string, index: number) => ({
        id: Date.now().toString() + index,
        isCompleted: false,
        title: subtaskTitle,
      })),
      description,
    }
    addTask(task)
    return NextResponse.json({ message: 'OK', task }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error', error },
      {
        status: 500,
      },
    )
  }
}

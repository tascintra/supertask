import { NextRequest, NextResponse } from 'next/server'
import { deleteTask, getTaskById, updateTask } from '@/data'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    const task = getTaskById(id)
    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'OK', task }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'ERROR' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { title, isCompleted, priority, progress, subtasks, description } = await request.json()
    const id = params.id
    updateTask(
      id,
      title,
      isCompleted,
      priority,
      progress,
      subtasks,
      description
    )
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'ERROR' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id
    deleteTask(id)
    return NextResponse.json({ message: 'OK' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'ERROR' }, { status: 500 })
  }
}

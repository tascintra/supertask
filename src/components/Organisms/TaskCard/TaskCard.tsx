import clsx from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'
import { Subtask } from '@/types'

const card = tv({
  base: 'flex w-full cursor-pointer items-center gap-4 rounded-3xl border border-neutral-200 bg-neutral-200 px-5 py-3 shadow-component transition hover:brightness-95 dark:border-dark-400 dark:shadow-neutral-900 hover:dark:brightness-125',
  variants: {
    isCompleted: {
      true: 'bg-neutral-200 text-neutral-400 dark:bg-dark-300',
      false: 'bg-white text-neutral-900 dark:bg-dark-600',
    },
  },
})

type TaskCardProps = VariantProps<typeof card> &
  React.ComponentProps<'div'> & {
    title?: string
    priority: 'high' | 'medium' | 'low'
    progress: number
    subTasks?: Subtask[]
  }

export const TaskCard = ({
  className,
  title,
  priority,
  progress,
  subTasks,
  isCompleted,
  onClick,
}: TaskCardProps) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#facc15',
    low: '#22c55e',
  }

  const percentage = `${progress}%`

  return (
    <div className={card({ isCompleted, className })} onClick={onClick}>
      <div
        style={
          {
            '--percent': percentage,
            '--color': priorityColors[priority],
            '--transparency': `${priorityColors[priority]}80`,
          } as React.CSSProperties
        }
        className={clsx(
          {
            'bg-[radial-gradient(closest-side,_white_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_var(--color)_var(--percent),_var(--transparency)_0)] dark:bg-[radial-gradient(closest-side,_#17181C_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_var(--color)_var(--percent),_var(--transparency)_0)]':
              !isCompleted,
          },
          {
            'bg-[radial-gradient(closest-side,_#e5e5e5_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_#a3a3a3_var(--percent),_var(--transparency)_0)] dark:bg-[radial-gradient(closest-side,_#2C2D36_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_#a3a3a3_var(--percent),_var(--transparency)_0)]':
              isCompleted,
          },
          'flex h-14 min-w-[56px] items-center justify-center rounded-full',
        )}
      >
        <p className="text-sm font-medium leading-none dark:text-neutral-200">
          {progress}%
        </p>
        <progress value={progress} max={100} className="hidden h-0 w-0" />
      </div>
      <div className="flex flex-col gap-1">
        <p
          className={clsx(
            { 'mt-2': subTasks },
            { 'text-neutral-900 dark:text-neutral-200': !isCompleted },
            { 'text-neutral-400': isCompleted },
            'text-base font-medium ',
          )}
        >
          {title}
        </p>
        {subTasks && (
          <p className="text-xs font-medium text-neutral-400">
            {subTasks.length} {subTasks.length === 1 ? 'task' : 'tasks'}
          </p>
        )}
      </div>
      <div
        className={clsx(
          'ml-auto h-14 min-w-[4px] rounded-full',
          { 'bg-red-500': priority === 'high' },
          { 'bg-amber-400': priority === 'medium' },
          { 'bg-green-500': priority === 'low' },
          { 'bg-neutral-400': isCompleted },
        )}
      />
    </div>
  )
}

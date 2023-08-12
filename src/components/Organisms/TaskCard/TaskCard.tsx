import clsx from 'clsx'
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'flex w-full cursor-pointer items-center gap-4 rounded-3xl border border-neutral-200 bg-white px-5 py-3 text-neutral-900 shadow-component transition hover:brightness-95 dark:border-dark-400 dark:bg-dark-600 dark:shadow-neutral-900 hover:dark:brightness-125',
})

type TaskCardProps = VariantProps<typeof card> &
  React.ComponentProps<'div'> & {
    title?: string
    priority: 'high' | 'medium' | 'low'
    progress: number
  }

export const TaskCard = ({
  className,
  title,
  priority,
  progress,
  onClick,
}: TaskCardProps) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#facc15',
    low: '#22c55e',
  }

  const percentage = `${progress}%`

  return (
    <div className={card({ className })} onClick={onClick}>
      <div
        style={
          {
            '--percent': percentage,
            '--color': priorityColors[priority],
            '--transparency': `${priorityColors[priority]}80`,
          } as React.CSSProperties
        }
        className={
          'flex h-14 min-w-[56px] items-center justify-center rounded-full bg-[radial-gradient(closest-side,_white_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_var(--color)_var(--percent),_var(--transparency)_0)] dark:bg-[radial-gradient(closest-side,_#17181C_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_var(--color)_var(--percent),_var(--transparency)_0)]'
        }
      >
        <p className="text-sm font-medium leading-none dark:text-neutral-200">
          {progress}%
        </p>
        <progress value={progress} max={100} className="hidden h-0 w-0" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="mt-2 text-base font-medium text-neutral-900 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-xs font-medium text-neutral-400">3 tasks</p>
      </div>
      <div
        className={clsx(
          'ml-auto h-14 min-w-[4px] rounded-full',
          { 'bg-red-500': priority === 'high' },
          { 'bg-amber-400': priority === 'medium' },
          { 'bg-green-500': priority === 'low' },
        )}
      />
    </div>
  )
}

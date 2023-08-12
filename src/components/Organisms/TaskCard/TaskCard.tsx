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

// TODO: adjust circle progress bar when height increase

export const TaskCard = ({
  className,
  title,
  priority,
  progress,
}: TaskCardProps) => {
  const priorityColors = {
    high: '#ef4444',
    medium: '#facc15',
    low: '#22c55e',
  }

  const radial = `bg-[radial-gradient(closest-side,_white_79%,_transparent_80%_100%),_conic-gradient(from_0deg_at_50%_50%,_${priorityColors[priority]}_${progress}%,_pink_0)]`

  return (
    <div className={card({ className })}>
      <div
        style={{
          backgroundImage: `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(${priorityColors[priority]} ${progress}%, ${priorityColors[priority]}80 0)`,
        }}
        className={
          'flex h-14 min-w-[56px] items-center justify-center rounded-full'
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
import { tv, type VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'dark:sha flex w-full cursor-pointer gap-4 rounded-3xl border border-neutral-200 bg-white px-5 py-3 text-neutral-900 shadow-component transition hover:brightness-95 dark:border-dark-400 dark:bg-dark-600 dark:shadow-neutral-900 hover:dark:brightness-125',
})

type TaskCardProps = VariantProps<typeof card> & React.ComponentProps<'div'>

export const TaskCard = ({ className }: TaskCardProps) => {
  return (
    <div className={card({ className })}>
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-radial before:text-sm before:font-medium before:content-["75%"] dark:bg-gradient-radial-dark dark:before:text-neutral-200'>
        <progress value={75} max={100} className="hidden h-0 w-0" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="mt-2 text-base font-medium text-neutral-900 dark:text-neutral-200">
          UI/UX App Design
        </p>
        <p className="text-xs font-medium text-neutral-400">3 tasks</p>
      </div>
      <div className="ml-auto w-1 rounded-full bg-red-500" />
    </div>
  )
}

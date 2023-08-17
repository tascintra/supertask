import { Check } from 'lucide-react'

type CheckboxProps = React.ComponentProps<'input'> & {
  type?: 'checkbox'
  cbLabel?: string
}

export const Checkbox = ({ id, cbLabel, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        {...props}
        className="peer relative z-10 h-5 w-5 cursor-pointer appearance-none"
      />
      <span className="absolute flex h-5 w-5 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-transparent shadow-component peer-checked:text-neutral-400 dark:border-neutral-400 dark:bg-neutral-200 dark:peer-checked:text-dark-300">
        <Check size={12} />
      </span>
      <label
        className="cursor-pointer decoration-neutral-800 peer-checked:text-neutral-400 peer-checked:line-through dark:text-neutral-200 dark:decoration-neutral-400"
        htmlFor={id}
      >
        {cbLabel}
      </label>
    </div>
  )
}

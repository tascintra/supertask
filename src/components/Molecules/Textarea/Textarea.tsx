import clsx from 'clsx'

type TextareaProps = React.ComponentProps<'textarea'> & {
  textareaLabel?: string
}

export const Textarea = ({ textareaLabel, ...props }: TextareaProps) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.name}
        className={clsx('pl-4 text-sm font-semibold text-primary-900')}
      >
        {textareaLabel}
      </label>
      <textarea
        className={clsx(
          'h-24 w-full resize-none overflow-hidden rounded-2xl border border-neutral-200 px-4 py-4 text-sm font-semibold shadow-component outline-none transition focus-within:shadow-focused dark:border-dark-400 dark:bg-dark-700 dark:text-neutral-200 dark:shadow-neutral-900 dark:focus-within:shadow-focused-dark',
        )}
        {...props}
      ></textarea>
    </div>
  )
}

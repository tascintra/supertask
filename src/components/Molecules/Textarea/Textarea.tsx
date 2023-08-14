import clsx from 'clsx'
import { forwardRef } from 'react'

type TextareaProps = React.ComponentProps<'textarea'> & {
  textareaLabel?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ textareaLabel, ...props }: TextareaProps, ref) => {
    return (
      <div className={clsx('flex flex-col', props.className)}>
        <label
          htmlFor={props.name}
          className="pl-4 text-sm font-semibold text-primary-900"
        >
          {textareaLabel}
        </label>
        <textarea
          ref={ref}
          className="h-24 w-full resize-none overflow-hidden rounded-2xl border border-neutral-200 px-4 py-4 text-sm font-semibold shadow-component outline-none transition focus-within:shadow-focused dark:border-dark-400 dark:bg-dark-700 dark:text-neutral-200 dark:shadow-neutral-900 dark:focus-within:shadow-focused-dark"
          {...props}
        />
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

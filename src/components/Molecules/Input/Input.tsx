import { forwardRef } from 'react'

type InputProps = React.ComponentProps<'input'> & {
  inputLabel?: string
  type?: 'text' | 'date'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputLabel, className, type, ...inputProps }: InputProps, ref) => {
    return (
      <div className={className}>
        <label
          htmlFor={inputProps.name}
          className="pl-4 text-sm font-semibold text-primary-900"
        >
          {inputLabel}
        </label>

        <input
          type={type}
          name={inputProps.name}
          id={inputProps.name}
          ref={ref}
          className="w-full overflow-hidden rounded-2xl border border-neutral-200 px-4 py-4 text-sm font-semibold leading-none shadow-component outline-none transition focus-within:shadow-focused dark:border-dark-400 dark:bg-dark-700 dark:text-neutral-200 dark:shadow-neutral-900 dark:focus-within:shadow-focused-dark"
          {...inputProps}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'

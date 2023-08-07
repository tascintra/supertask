import clsx from 'clsx'

type InputProps = React.ComponentProps<'input'> & {
  inputLabel?: string
  type?: 'text' | 'date'
}

export const Input = ({
  inputLabel,
  className,
  type,
  ...inputProps
}: InputProps) => {
  return (
    <div className={clsx(className)}>
      <label
        htmlFor={inputProps.name}
        className={clsx('pl-4 text-sm font-semibold text-primary-900')}
      >
        {inputLabel}
      </label>

      <input
        type={type}
        name={inputProps.name}
        id={inputProps.name}
        className={clsx(
          'w-full overflow-hidden rounded-2xl border border-neutral-200 px-4 py-4 text-sm font-semibold leading-none shadow-component outline-none transition focus-within:shadow-focused dark:border-dark-400 dark:bg-dark-700 dark:text-neutral-200 dark:shadow-neutral-900 dark:focus-within:shadow-focused-dark',
        )}
        {...inputProps}
      />
    </div>
  )
}

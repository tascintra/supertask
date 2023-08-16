import { forwardRef } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const radio = tv({
  slots: {
    base: 'w-full cursor-pointer rounded-full border-2 border-transparent py-[6px] text-center text-base font-medium text-neutral-50 shadow-component transition peer-checked:border-neutral-800 peer-checked:shadow-focused dark:peer-checked:border-neutral-50 dark:peer-checked:shadow-focused-dark',
    wrapper: 'flex w-full',
    button: 'peer hidden',
  },
  variants: {
    color: {
      critical: 'bg-red-500 hover:bg-red-400 peer-checked:bg-red-400',
      attention: 'bg-amber-400 hover:bg-amber-500 peer-checked:bg-amber-500',
      success: 'bg-green-500 hover:bg-green-400 peer-checked:bg-green-400',
    },
  },
  defaultVariants: {
    color: 'critical',
  },
})

type RadioProps = VariantProps<typeof radio> &
  React.ComponentProps<'input'> & {
    value?: string
    radioLabel?: string
    type?: 'radio'
  }

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ color, value, radioLabel, ...props }: RadioProps, ref) => {
    const { button, wrapper, base } = radio({ color })

    return (
      <div className={wrapper()}>
        <input
          className={button()}
          type="radio"
          value={value}
          id={value}
          ref={ref}
          {...props}
        />
        <label className={base()} htmlFor={value}>
          {radioLabel}
        </label>
      </div>
    )
  },
)

Radio.displayName = 'Radio'

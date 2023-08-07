import { tv, type VariantProps } from 'tailwind-variants'

type ButtonProps = VariantProps<typeof button> & React.ComponentProps<'button'>

const button = tv({
  base: 'w-full rounded-full py-1 text-base font-medium text-neutral-50 shadow transition dark:shadow-neutral-600',
  variants: {
    color: {
      default:
        'bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600',
      secondary: 'bg-primary-200 hover:bg-primary-500',
      confirm: 'bg-primary-700 hover:bg-primary-900',
      critic: 'bg-red-500 hover:bg-red-400',
      attention: 'bg-amber-400 hover:bg-amber-500',
      success: 'bg-green-500 hover:bg-green-400',
      icon: 'flex w-10 justify-center border border-neutral-900 bg-neutral-800 hover:bg-neutral-900',
    },
  },
  defaultVariants: { color: 'default' },
})

export const Button = ({ color, className, ...props }: ButtonProps) => {
  return <button {...props} className={button({ color, className })} />
}

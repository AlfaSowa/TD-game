import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  badge?: number | string | ReactNode
}

export const Button = ({ onClick, badge, children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        clsx(
          'border-2 rounded border-[var(--primary)] text-2xl w-full flex items-center justify-center relative',
          className
        )
      )}
      onClick={onClick}
      {...props}
    >
      <div className={clsx('flex-1', badge && 'pl-[20%]')}>{children}</div>

      {badge && <div className="flex-[0_9999_20%] border-l-2 border-[var(--main)] border-dotted ">{badge}</div>}
    </button>
  )
}

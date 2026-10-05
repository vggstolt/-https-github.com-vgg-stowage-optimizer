import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon } from './Icon'
import type { IconName } from '../../design/icons'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** AUB Buttons 2.1: Primary / Secondary / Tertiary */
  variant?: 'primary' | 'secondary' | 'tertiary'
  tone?: 'default' | 'danger'
  size?: 'large' | 'small'
  iconLeft?: IconName
  iconRight?: IconName
}

/** Buttons 2.1 — 4px radius, 16px icon, 8px gap, Body 1 / Body 2 label. */
export function Button({
  variant = 'primary',
  tone = 'default',
  size = 'large',
  iconLeft,
  iconRight,
  className,
  children,
  ...rest
}: ButtonProps) {
  const danger = tone === 'danger'
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-aub-sm border font-bold whitespace-nowrap transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'large' ? 'h-10 px-4 text-[14px] leading-5' : 'h-8 px-3 text-[12px] leading-[18px]',
        variant === 'primary' &&
          (danger
            ? 'border-danger bg-danger text-f5 hover:bg-[#b93a55]'
            : 'border-p1 bg-p1 text-f5 hover:border-p2 hover:bg-p2 active:bg-p3'),
        variant === 'secondary' &&
          (danger
            ? 'border-danger bg-n12 text-danger hover:bg-danger-soft'
            : 'border-p1 bg-n12 text-p1 hover:bg-p5 active:bg-p4/40'),
        variant === 'tertiary' &&
          (danger
            ? 'border-transparent bg-transparent text-danger hover:bg-danger-soft'
            : 'border-transparent bg-transparent text-p1 hover:bg-p5'),
        className,
      )}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" inline />}
      {children}
      {iconRight && <Icon name={iconRight} size="sm" inline />}
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName
  label: string
  variant?: 'primary' | 'ghost'
  active?: boolean
}

/** Square icon-only button; glyph 16px in a 24px box, 40px hit area by default. */
export function IconButton({ icon, label, variant = 'ghost', active, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-aub-sm transition-colors',
        variant === 'primary' && 'bg-p1 text-f5 hover:bg-p2',
        variant === 'ghost' && (active ? 'bg-p5 text-p1' : 'text-p1 hover:bg-p5'),
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size="lg" />
    </button>
  )
}

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: IconName
  iconRight?: IconName
  size?: 'md' | 'sm'
}

/** Inline text action (e.g. "Reset all"). Disabled state drops to N7. */
export function LinkButton({ iconLeft, iconRight, size = 'md', className, children, ...rest }: LinkButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center gap-1.5 font-bold text-p1 hover:underline disabled:cursor-default disabled:text-n7 disabled:no-underline',
        size === 'md' ? 'text-[14px] leading-5' : 'text-[12px] leading-[18px]',
        className,
      )}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size="sm" inline />}
      {children}
      {iconRight && <Icon name={iconRight} size="sm" inline />}
    </button>
  )
}

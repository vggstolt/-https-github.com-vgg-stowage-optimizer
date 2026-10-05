import clsx from 'clsx'
import type { ReactNode } from 'react'

type StatusChipProps = {
  tone: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: ReactNode
  className?: string
}

/** Outlined status pill (e.g. optimizer run state). */
export function StatusChip({ tone, children, className }: StatusChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex h-6 items-center rounded-aub-pill border-2 px-3 text-[12px] leading-[18px] font-bold whitespace-nowrap',
        tone === 'success' && 'border-success text-[#2f8f2f]',
        tone === 'warning' && 'border-warning text-[#9a6300]',
        tone === 'danger' && 'border-danger text-danger',
        tone === 'info' && 'border-p1 text-p1',
        tone === 'neutral' && 'border-n7 text-f3',
        className,
      )}
    >
      {children}
    </span>
  )
}

type TankChipProps = {
  children: ReactNode
  tone: 'pinned' | 'avoid' | 'disabled'
  selected?: boolean
  onClick?: () => void
  className?: string
}

/** Compact tank id chip used for pinned / avoid tank selections. */
export function TankChip({ children, tone, onClick, className }: TankChipProps) {
  const Comp = onClick ? 'button' : 'span'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        'inline-flex h-6 min-w-10 items-center justify-center rounded-aub-pill px-3 text-[12px] leading-[18px] font-bold',
        tone === 'pinned' && 'bg-p2 text-f5',
        tone === 'avoid' && 'bg-danger-soft text-danger',
        tone === 'disabled' && 'bg-n10 text-n7',
        onClick && 'cursor-pointer hover:opacity-90',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

type TagProps = {
  children: ReactNode
  tone?: 'neutral' | 'primary' | 'dark'
  className?: string
}

/** Small rectangular tag (tank capacity / coating). */
export function Tag({ children, tone = 'neutral', className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex h-4 items-center rounded-aub-pill px-1.5 text-[12px] leading-4 font-bold tracking-normal whitespace-nowrap',
        tone === 'neutral' && 'bg-n8 text-f1',
        tone === 'primary' && 'bg-p3 text-f5',
        tone === 'dark' && 'bg-n3 text-f5',
        className,
      )}
    >
      {children}
    </span>
  )
}

import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'section' | 'div' | 'article'
}

/** Card: Main — white surface, 1px N8 stroke, 8px radius. */
export function Card({ as: Comp = 'section', className, ...rest }: CardProps) {
  return <Comp className={clsx('rounded-aub-md border border-n8 bg-n12', className)} {...rest} />
}

type BannerProps = {
  tone?: 'info' | 'warning' | 'danger' | 'success'
  children: ReactNode
  className?: string
}

/** Inline banner with leading 16px status icon. */
export function Banner({ tone = 'info', children, className }: BannerProps) {
  return (
    <div
      role="status"
      className={clsx(
        'flex items-center gap-3 rounded-aub-sm px-4 py-3 text-[14px] leading-5 text-f1',
        tone === 'info' && 'bg-info-soft',
        tone === 'warning' && 'bg-warning-soft',
        tone === 'danger' && 'bg-danger-soft',
        tone === 'success' && 'bg-success-soft',
        className,
      )}
    >
      <Icon
        name="info"
        size="md"
        className={clsx(
          tone === 'info' && 'text-p1',
          tone === 'warning' && 'text-warning',
          tone === 'danger' && 'text-danger',
          tone === 'success' && 'text-success',
        )}
      />
      <span>{children}</span>
    </div>
  )
}

type InfoHintProps = { text: string; className?: string }

/** The small P1 "i" glyph that follows option labels; exposes its text as a tooltip. */
export function InfoHint({ text, className }: InfoHintProps) {
  return (
    <button
      type="button"
      aria-label={text}
      title={text}
      className={clsx('inline-flex size-4 cursor-help items-center justify-center rounded-full text-p1', className)}
    >
      <Icon name="info" size="sm" inline />
    </button>
  )
}

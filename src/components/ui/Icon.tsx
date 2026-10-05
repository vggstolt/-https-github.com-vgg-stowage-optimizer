import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { icons, type IconName } from '../../design/icons'

/**
 * AUB icon sizes. `glyph` is the rendered Font Awesome glyph size, `box` is the
 * fixed square the glyph is centred in. Matches "Icon/FA - Regular" (16px glyph in
 * a 24px box) from the design system; `sm` and `lg` follow the same 8px rhythm.
 */
const sizes = {
  xs: { glyph: 10, box: 16 },
  sm: { glyph: 12, box: 16 },
  md: { glyph: 16, box: 24 },
  lg: { glyph: 20, box: 24 },
  xl: { glyph: 24, box: 32 },
} as const

export type IconSize = keyof typeof sizes

type IconProps = {
  name: IconName
  size?: IconSize
  /** Renders the glyph without the fixed square box (for inline text use). */
  inline?: boolean
  className?: string
  title?: string
}

export function Icon({ name, size = 'md', inline = false, className, title }: IconProps) {
  const { glyph, box } = sizes[size]
  const svg = (
    <FontAwesomeIcon
      icon={icons[name]}
      fixedWidth
      title={title}
      aria-hidden={title ? undefined : true}
      style={{ width: glyph, height: glyph }}
      className={inline ? className : undefined}
    />
  )

  if (inline) return svg

  return (
    <span
      className={clsx('inline-flex shrink-0 items-center justify-center', className)}
      style={{ width: box, height: box }}
    >
      {svg}
    </span>
  )
}

import clsx from 'clsx'
import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react'
import { Icon } from './Icon'

type FieldShellProps = {
  label: string
  helper?: string
  emphasis?: boolean
  disabled?: boolean
  className?: string
  children: ReactNode
  trailing?: ReactNode
}

/**
 * InputField v2.2 — 40px outlined field with the label floating on the border.
 * `emphasis` renders the P1 border used for user-edited values.
 */
function FieldShell({ label, helper, emphasis, disabled, className, children, trailing }: FieldShellProps) {
  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <div
        className={clsx(
          'relative flex h-10 items-center rounded-aub-sm border bg-n12 transition-colors',
          emphasis ? 'border-p1' : 'border-n7',
          disabled && 'bg-n11',
          'focus-within:border-p1',
        )}
      >
        <span className="pointer-events-none absolute -top-[9px] left-2 bg-n12 px-1 text-[12px] leading-[18px] text-f2">
          {label}
        </span>
        {children}
        {trailing && <span className="pointer-events-none absolute right-2 text-f2">{trailing}</span>}
      </div>
      {helper && <span className="px-3 text-[12px] leading-[18px] text-f3">{helper}</span>}
    </div>
  )
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  label: string
  helper?: string
  emphasis?: boolean
  className?: string
}

export function TextField({ label, helper, emphasis, className, disabled, ...rest }: TextFieldProps) {
  const id = useId()
  return (
    <FieldShell label={label} helper={helper} emphasis={emphasis} disabled={disabled} className={className}>
      <input
        id={id}
        aria-label={label}
        disabled={disabled}
        className="h-full w-full bg-transparent px-3 text-[14px] leading-5 font-bold text-f1 outline-none placeholder:font-normal placeholder:text-f3 disabled:text-f3"
        {...rest}
      />
    </FieldShell>
  )
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
  label: string
  helper?: string
  emphasis?: boolean
  options: { value: string; label: string }[]
  className?: string
}

export function SelectField({ label, helper, emphasis, options, className, disabled, ...rest }: SelectFieldProps) {
  const id = useId()
  return (
    <FieldShell
      label={label}
      helper={helper}
      emphasis={emphasis}
      disabled={disabled}
      className={className}
      trailing={<Icon name="chevronDown" size="sm" />}
    >
      <select
        id={id}
        aria-label={label}
        disabled={disabled}
        className="h-full w-full cursor-pointer appearance-none bg-transparent pr-9 pl-3 text-[14px] leading-5 font-bold text-f1 outline-none disabled:cursor-default disabled:text-f3"
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

import clsx from 'clsx'

type SwitchProps = {
  checked: boolean
  onChange?: (checked: boolean) => void
  /** Text shown inside the track, e.g. ["Off", "Yes"] or ["Off", "On"]. */
  labels?: [off: string, on: string]
  disabled?: boolean
  'aria-label'?: string
}

/**
 * Switch v2.1 — labelled track (56×24), 20px knob. On = P1 track with white
 * label, Off = N7 track.
 */
export function Switch({ checked, onChange, labels = ['Off', 'On'], disabled, ...aria }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={aria['aria-label']}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={clsx(
        'relative inline-flex h-6 w-14 shrink-0 items-center rounded-aub-pill text-[12px] leading-[18px] font-bold transition-colors select-none',
        checked ? 'bg-p1 text-f5' : 'bg-n7 text-f5',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 size-5 rounded-full bg-n12 shadow-e01 transition-all',
          checked ? 'left-[calc(100%-22px)]' : 'left-0.5',
        )}
      />
      <span className={clsx('absolute inset-y-0 flex items-center', checked ? 'left-2' : 'right-2')}>
        {checked ? labels[1] : labels[0]}
      </span>
    </button>
  )
}

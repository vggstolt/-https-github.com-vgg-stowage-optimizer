import clsx from 'clsx'

type SegmentedControlProps<T extends string> = {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  'aria-label': string
  className?: string
}

/** Two-to-three option toggle. Selected segment is filled P1, others white with P1 text. */
export function SegmentedControl<T extends string>({ options, value, onChange, className, ...aria }: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={aria['aria-label']}
      className={clsx('inline-flex h-8 overflow-hidden rounded-aub-sm border border-p1 bg-n12', className)}
    >
      {options.map((option, i) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={clsx(
              'min-w-12 px-3 text-[14px] leading-5 font-bold transition-colors',
              i > 0 && 'border-l border-p1',
              selected ? 'bg-p1 text-f5' : 'bg-n12 text-p1 hover:bg-p5',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

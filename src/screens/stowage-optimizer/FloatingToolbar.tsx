import { Fragment, useState } from 'react'
import type { IconName } from '../../design/icons'
import { Icon } from '../../components/ui/Icon'

const tools: { icon: IconName; label: string }[] = [
  { icon: 'checklist', label: 'Validation checklist' },
  { icon: 'planLayers', label: 'Plan layers' },
  { icon: 'history', label: 'Plan history' },
  { icon: 'copy', label: 'Copy stowage plan' },
  { icon: 'route', label: 'Voyage route' },
  { icon: 'comments', label: 'Comments' },
  { icon: 'validated', label: 'Validate plan' },
]

/** Vertical tool rail that floats between the planning panel and the tank grid. */
export function FloatingToolbar() {
  const [active, setActive] = useState<IconName | null>(null)

  return (
    <div
      role="toolbar"
      aria-orientation="vertical"
      aria-label="Stowage plan tools"
      className="flex w-12 flex-col items-center rounded-aub-md border border-n8 bg-n12 py-1 shadow-e03"
    >
      {tools.map((tool, i) => (
        <Fragment key={tool.icon}>
          {i > 0 && <span className="my-0.5 h-px w-5 bg-n8" aria-hidden />}
          <button
            type="button"
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={active === tool.icon}
            onClick={() => setActive((prev) => (prev === tool.icon ? null : tool.icon))}
            className={
              active === tool.icon
                ? 'flex size-10 items-center justify-center rounded-aub-sm bg-p5 text-p1'
                : 'flex size-10 items-center justify-center rounded-aub-sm text-p1 transition-colors hover:bg-p5'
            }
          >
            <Icon name={tool.icon} size="lg" />
          </button>
        </Fragment>
      ))}
    </div>
  )
}

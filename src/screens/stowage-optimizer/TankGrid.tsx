import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { IconButton } from '../../components/ui/Button'
import { Tag } from '../../components/ui/Chip'
import { Icon } from '../../components/ui/Icon'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { Switch } from '../../components/ui/Switch'
import { centreTanks, portWingTanks, sgBandClass, sgLegend, starboardWingTanks, weightSummary, type Tank } from './data'

type ViewMode = 'SP' | 'LC'
type StowMethod = 'drag' | 'click'

function TankCell({
  tank,
  tall,
  active,
  onSelect,
}: {
  tank: Tank
  tall?: boolean
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`Tank ${tank.id}, ${tank.cargo}, ${tank.quantity} MT`}
      className={clsx(
        'relative flex w-full flex-col overflow-hidden rounded-aub-xs border border-transparent bg-n12 px-1.5 py-1 text-left text-[11px] leading-4 tracking-normal text-f1 transition-colors',
        tall ? 'h-[118px]' : 'h-[78px]',
        active ? 'bg-p5' : 'hover:border-p4',
        tank.avoid && 'bg-[#fff2f0]',
      )}
    >
      {tall ? (
        <>
          <span className="self-end font-bold whitespace-nowrap">
            {tank.capacity} | {tank.id}
          </span>
          <span className="inline-flex items-center gap-0.5 font-bold whitespace-nowrap">
            <Icon name="temperature" size="xs" inline className={sgBandClass[tank.sgBand]} />
            {tank.temperature}
          </span>
        </>
      ) : (
        <span className="flex items-center justify-between gap-1 font-bold whitespace-nowrap">
          <span className="inline-flex items-center gap-0.5">
            <Icon name="temperature" size="xs" inline className={sgBandClass[tank.sgBand]} />
            <span className="hidden @[400px]:inline">{tank.temperature}</span>
          </span>
          <span>
            {tank.capacity} | {tank.id}
          </span>
        </span>
      )}
      <span className="truncate">{tank.cargo}</span>
      {tank.pinned && (
        <Icon name="pinned" size="xs" inline className="absolute bottom-1.5 left-1.5 text-p1" title="Pinned tank" />
      )}
      {tank.avoid && (
        <Icon
          name="avoid"
          size="xs"
          inline
          className="absolute bottom-1.5 left-1.5 text-danger"
          title="Tank to avoid"
        />
      )}
      <span className="mt-auto flex items-center justify-end gap-1 pt-1">
        <Tag tone="neutral">{tank.quantity}</Tag>
        <Tag tone="primary">{tank.coating}</Tag>
      </span>
    </button>
  )
}

function Legend() {
  return (
    <div className="flex flex-col gap-3 text-[12px] leading-[18px]">
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center gap-2 font-bold text-f1">
          <Icon name="pinned" size="sm" className="text-p1" />
          Pinned Tank
        </span>
        <span className="inline-flex items-center gap-2 font-bold text-f1">
          <Icon name="avoid" size="sm" className="text-danger" />
          Tank to Avoid
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-f2">SG Temperature</span>
        {sgLegend.map((item) => (
          <span key={item.band} className="inline-flex items-center gap-2 font-bold text-f1">
            <Icon name="temperature" size="sm" className={item.className} />
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-f2">Tank coating</span>
        <span className="inline-flex items-center gap-2 font-bold text-f1">
          <span className="inline-flex size-4 items-center justify-center rounded-aub-xs border border-f1 text-[10px] leading-none font-bold">
            C
          </span>
          <span className="rounded-aub-xs bg-n9 px-1">S2101</span>
        </span>
      </div>
    </div>
  )
}

function Controls() {
  const [viewMode, setViewMode] = useState<ViewMode>('SP')
  const [stowMethod, setStowMethod] = useState<StowMethod>('drag')
  const [validations, setValidations] = useState(true)

  return (
    <div className="flex flex-col gap-3 text-[14px] leading-5">
      <div className="flex flex-col gap-1">
        <span className="text-f2">View mode</span>
        <SegmentedControl
          aria-label="View mode"
          value={viewMode}
          onChange={setViewMode}
          options={[
            { value: 'SP', label: 'SP' },
            { value: 'LC', label: 'LC' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-f2">Stow method</span>
        <SegmentedControl
          aria-label="Stow method"
          value={stowMethod}
          onChange={setStowMethod}
          options={[
            { value: 'drag', label: 'Drag' },
            { value: 'click', label: 'Click' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-f2">Tank validations</span>
        <Switch aria-label="Tank validations" checked={validations} onChange={setValidations} labels={['Off', 'On']} />
      </div>
      <dl className="m-0 mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
        <dt className="text-f2">
          <Icon name="weightBalance" size="sm" className="text-f2" title="Listing" />
        </dt>
        <dd className="m-0 font-bold text-danger">{weightSummary.listing}</dd>
        <dt className="text-f2">Port</dt>
        <dd className="m-0 font-bold text-f1">{weightSummary.port}</dd>
        <dt className="text-f2">Centre</dt>
        <dd className="m-0 font-bold text-f1">{weightSummary.centre}</dd>
        <dt className="text-f2">Starboard</dt>
        <dd className="m-0 font-bold text-f1">{weightSummary.starboard}</dd>
      </dl>
    </div>
  )
}

export function TankGrid({ fullscreen, onToggleFullscreen }: { fullscreen: boolean; onToggleFullscreen: () => void }) {
  const [activeIds, setActiveIds] = useState<Set<string>>(
    () =>
      new Set(
        centreTanks
          .flat()
          .filter((t) => t.selected)
          .map((t) => t.id),
      ),
  )

  const toggle = (id: string) =>
    setActiveIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const cell = (tank: Tank, tall?: boolean) => (
    <TankCell key={tank.id} tank={tank} tall={tall} active={activeIds.has(tank.id)} onSelect={() => toggle(tank.id)} />
  )

  return (
    <div className="flex h-full min-h-0 flex-col bg-n9">
      <div className="scrollbar-thin grid min-h-0 flex-1 grid-cols-[134px_minmax(0,1fr)_134px] gap-x-1.5 overflow-y-auto px-2 pt-4 pb-4">
        <div className="flex flex-col gap-2.5">
          <IconButton
            icon={fullscreen ? 'close' : 'fullscreen'}
            label={fullscreen ? 'Exit full screen' : 'Full screen'}
            variant="primary"
            onClick={onToggleFullscreen}
            className="mb-[9px] size-9 self-start"
          />
          {portWingTanks.map((tank) => cell(tank, true))}
          <div className="mt-auto pt-6">
            <Controls />
          </div>
        </div>

        <div
          className="@container relative grid grid-cols-[1fr_1fr_4px_1fr] gap-[3px] self-start"
          role="grid"
          aria-label="Cargo tanks"
        >
          {/* Vessel centreline between the second and third column */}
          <span
            className="pointer-events-none absolute inset-y-0 z-10 w-1 bg-n6"
            style={{ left: 'calc((100% - 13px) * 2 / 3 + 6px)' }}
            aria-hidden
          />
          {centreTanks.map((row, i) => (
            <div key={i} role="row" className="contents">
              {row.map((tank, col) => (
                <Fragment key={tank.id}>
                  {col === 2 && <span aria-hidden />}
                  {cell(tank)}
                </Fragment>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 pt-[55px]">
          {starboardWingTanks.map((tank) => cell(tank, true))}
          <div className="mt-auto pt-6">
            <Legend />
          </div>
        </div>
      </div>
    </div>
  )
}

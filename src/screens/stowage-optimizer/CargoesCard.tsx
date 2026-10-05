import clsx from 'clsx'
import { useState } from 'react'
import { Button, LinkButton } from '../../components/ui/Button'
import { TankChip } from '../../components/ui/Chip'
import { Card, InfoHint } from '../../components/ui/Surface'
import { Switch } from '../../components/ui/Switch'
import { SelectField, TextField } from '../../components/ui/TextField'
import { cargoes, type Cargo } from './data'

type CargoInput = {
  includeHistory: boolean
  minimizeChanges: boolean
  stowageSpec: string
  minQty: string
  maxQty: string
}

const defaultInput: CargoInput = {
  includeHistory: true,
  minimizeChanges: false,
  stowageSpec: 'partial',
  minQty: '5',
  maxQty: '31000',
}

const pinnedTanks = [
  { id: '1P', active: true },
  { id: '1S', active: true },
  { id: '2P', active: false },
  { id: '2S', active: false },
  { id: '3P', active: true },
]
const avoidTanks = ['4P', '5S', '3P', '3S']

function CargoListItem({ cargo, selected, onSelect }: { cargo: Cargo; selected: boolean; onSelect: () => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={selected ? 'true' : undefined}
        className={clsx(
          'relative flex w-full flex-col items-start gap-0.5 border-b border-n8 px-4 py-3 text-left text-[12px] leading-[18px] transition-colors',
          selected ? 'bg-p5 text-p1' : 'text-f1 hover:bg-n11',
        )}
      >
        {selected && <span className="absolute inset-y-0 left-0 w-[3px] bg-p1" aria-hidden />}
        <span className="font-bold">{cargo.number}</span>
        <span className="font-bold">{cargo.name}</span>
        <span className={clsx(selected ? 'text-p1' : 'text-f2')}>
          Nom. qty: {cargo.nominalQty} -{' '}
          <span className="underline decoration-dotted underline-offset-4">{cargo.terms}</span>
        </span>
        {cargo.pending && (
          <span
            className="absolute top-3 right-4 size-2 rounded-full bg-n8"
            title="Cargo input not yet reviewed"
            aria-label="Cargo input not yet reviewed"
          />
        )}
      </button>
    </li>
  )
}

export function CargoesCard() {
  const [selectedId, setSelectedId] = useState(cargoes[0].id)
  const [inputs, setInputs] = useState<Record<string, CargoInput>>({})
  const selected = cargoes.find((c) => c.id === selectedId) ?? cargoes[0]
  const input = inputs[selected.id] ?? defaultInput
  const dirty = JSON.stringify(input) !== JSON.stringify(defaultInput)

  const update = (patch: Partial<CargoInput>) =>
    setInputs((prev) => ({ ...prev, [selected.id]: { ...(prev[selected.id] ?? defaultInput), ...patch } }))

  return (
    <Card className="@container flex flex-col">
      <div className="flex flex-col @3xl:flex-row">
        <aside className="flex flex-col border-b border-n8 @3xl:w-[256px] @3xl:shrink-0 @3xl:border-r @3xl:border-b-0">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <h2 className="t4 text-f1">Cargoes ({cargoes.length})</h2>
            <LinkButton size="sm" disabled={Object.keys(inputs).length === 0} onClick={() => setInputs({})}>
              Reset all
            </LinkButton>
          </div>
          <ul className="scrollbar-thin m-0 max-h-[420px] list-none overflow-y-auto p-0">
            {cargoes.map((cargo) => (
              <CargoListItem
                key={cargo.id}
                cargo={cargo}
                selected={cargo.id === selected.id}
                onSelect={() => setSelectedId(cargo.id)}
              />
            ))}
          </ul>
        </aside>

        <div className="@container flex min-w-0 flex-1 flex-col gap-3 p-4">
          <div className="flex justify-end">
            <Button variant="primary">Tank Preference</Button>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="t4 text-f2">
              {selected.number} - {selected.name}
            </h3>
            <LinkButton size="sm" disabled={!dirty} onClick={() => update(defaultInput)}>
              Reset cargo input
            </LinkButton>
          </div>

          <div className="flex flex-col gap-6 rounded-aub-sm border border-n8 p-4 @2xl:flex-row">
            <div className="flex flex-col gap-4 @2xl:w-[400px] @2xl:shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col text-[14px] leading-5 text-f1">
                  Include last cargo history in optimization
                  <span className="text-[12px] leading-[18px] text-f3">Current: Yes</span>
                </div>
                <Switch
                  aria-label="Include last cargo history in optimization"
                  checked={input.includeHistory}
                  onChange={(includeHistory) => update({ includeHistory })}
                  labels={['No', 'Yes']}
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col text-[14px] leading-5 text-f1">
                  <span className="inline-flex items-center gap-1.5">
                    Minimize changes
                    <InfoHint text="Keep this cargo in its currently stowed tanks where possible." />
                  </span>
                  <span className="text-[12px] leading-[18px] text-f3">Current: No</span>
                </div>
                <Switch
                  aria-label="Minimize changes"
                  checked={input.minimizeChanges}
                  onChange={(minimizeChanges) => update({ minimizeChanges })}
                  labels={['No', 'Yes']}
                />
              </div>
              <div className="flex items-start gap-3">
                <SelectField
                  className="flex-1"
                  label="Stowage specification option"
                  helper="Current: Optimizer default"
                  value={input.stowageSpec}
                  onChange={(e) => update({ stowageSpec: e.target.value })}
                  options={[
                    { value: 'default', label: 'Optimizer default' },
                    { value: 'partial', label: 'Partially allowed' },
                    { value: 'strict', label: 'Strictly follow' },
                    { value: 'ignore', label: 'Ignore' },
                  ]}
                />
                <InfoHint
                  className="mt-3"
                  text="Controls how strictly the optimizer follows the stowage specification for this cargo."
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="t9 text-f1">Intended quantity to be stowed (MT)</span>
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Min (MT)"
                    emphasis
                    inputMode="numeric"
                    value={input.minQty}
                    onChange={(e) => update({ minQty: e.target.value })}
                  />
                  <TextField
                    label="Max (MT)"
                    emphasis
                    inputMode="numeric"
                    value={input.maxQty}
                    onChange={(e) => update({ maxQty: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="hidden w-px shrink-0 bg-n8 @2xl:block" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="t9 text-f1">Pinned tanks</span>
                <div className="flex flex-wrap gap-2">
                  {pinnedTanks.map((tank) => (
                    <TankChip key={tank.id} tone={tank.active ? 'pinned' : 'disabled'}>
                      {tank.id}
                    </TankChip>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="t9 text-f1">Tanks to Avoid</span>
                <div className="flex flex-wrap gap-2">
                  {avoidTanks.map((id) => (
                    <TankChip key={id} tone="avoid">
                      {id}
                    </TankChip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

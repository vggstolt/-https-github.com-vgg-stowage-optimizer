import { useState } from 'react'
import { LinkButton } from '../../components/ui/Button'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { Card, InfoHint } from '../../components/ui/Surface'
import { Switch } from '../../components/ui/Switch'
import { SelectField, TextField } from '../../components/ui/TextField'
import { optimizerOptions, type OptimizerOptionKey } from './data'

type Mode = 'input' | 'output'

const vesselDefaults = {
  season: 'other',
  deadweight: '',
  inhibited: 'yes',
  minFill: '33',
  maxDeckTemp: '33',
}

export function OptimizerInputCard() {
  const [mode, setMode] = useState<Mode>('input')
  const [options, setOptions] = useState<Record<OptimizerOptionKey, boolean>>(() =>
    Object.fromEntries(optimizerOptions.map((o) => [o.key, false])) as Record<OptimizerOptionKey, boolean>,
  )
  const [vessel, setVessel] = useState(vesselDefaults)
  const vesselDirty = JSON.stringify(vessel) !== JSON.stringify(vesselDefaults)

  return (
    <Card className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="t4 text-f1">Optimizer input</h2>
        <SegmentedControl
          aria-label="Optimizer view"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'input', label: 'Input' },
            { value: 'output', label: 'Output' },
          ]}
        />
      </div>

      {mode === 'input' ? (
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-col gap-3 lg:w-[380px] lg:shrink-0">
            {optimizerOptions.map((option) => (
              <div key={option.key} className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 text-[14px] leading-5 text-f1">
                  {option.label}
                  <InfoHint text={option.hint} />
                </span>
                <Switch
                  aria-label={option.label}
                  checked={options[option.key]}
                  onChange={(checked) => setOptions((prev) => ({ ...prev, [option.key]: checked }))}
                  labels={['Off', 'On']}
                />
              </div>
            ))}
            <TextField label="Optimizer run time (minutes)" defaultValue="Default" className="mt-2" />
          </div>

          <div className="hidden w-px shrink-0 bg-n8 lg:block" />

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="t5 text-f1">Vessel inputs</h3>
              <LinkButton size="sm" disabled={!vesselDirty} onClick={() => setVessel(vesselDefaults)}>
                Reset vessel input
              </LinkButton>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3">
              <SelectField
                label="Season"
                value={vessel.season}
                onChange={(e) => setVessel({ ...vessel, season: e.target.value })}
                options={[
                  { value: 'other', label: 'Other' },
                  { value: 'summer', label: 'Summer' },
                  { value: 'winter', label: 'Winter' },
                  { value: 'tropical', label: 'Tropical' },
                ]}
              />
              <TextField
                label="Deadweight"
                placeholder="Deadweight"
                value={vessel.deadweight}
                onChange={(e) => setVessel({ ...vessel, deadweight: e.target.value })}
                inputMode="numeric"
              />
              <SelectField
                label="Inhibited in deck tank"
                helper="Current: Yes"
                value={vessel.inhibited}
                onChange={(e) => setVessel({ ...vessel, inhibited: e.target.value })}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />
              <TextField
                label="Minimum tank fill (%)"
                helper="Current: 33%"
                value={vessel.minFill}
                onChange={(e) => setVessel({ ...vessel, minFill: e.target.value })}
                inputMode="numeric"
              />
              <span className="hidden md:block" />
              <TextField
                label="Max temperature in deck tank (°C)"
                helper="Current: 33°C"
                value={vessel.maxDeckTemp}
                onChange={(e) => setVessel({ ...vessel, maxDeckTemp: e.target.value })}
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2 rounded-aub-sm bg-n11 p-4 text-[14px] leading-5 text-f2">
          <span className="t5 text-f1">Optimizer output</span>
          <p className="m-0">
            The last run stowed all 10 cargoes across 46 tanks with an optimality gap of 7%. Switch back to{' '}
            <strong className="text-f1">Input</strong> to adjust constraints and run the optimizer again.
          </p>
        </div>
      )}
    </Card>
  )
}

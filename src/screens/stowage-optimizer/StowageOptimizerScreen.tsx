import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LeftNavigation } from '../../components/layout/LeftNavigation'
import { Button, IconButton, LinkButton } from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { Banner } from '../../components/ui/Surface'
import { CargoesCard } from './CargoesCard'
import { FloatingToolbar } from './FloatingToolbar'
import { OptimizationStatusCard } from './OptimizationStatusCard'
import { OptimizerInputCard } from './OptimizerInputCard'
import { TankGrid } from './TankGrid'
import { voyage } from './data'

export function StowageOptimizerScreen() {
  const [fullscreen, setFullscreen] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [running, setRunning] = useState(false)

  const runOptimizer = () => {
    setRunning(true)
    window.setTimeout(() => setRunning(false), 1800)
  }

  return (
    <div className="flex h-screen min-w-[1440px] overflow-hidden bg-n11">
      <LeftNavigation />

      <div className="relative flex min-w-0 flex-1">
        {/* Planning panel */}
        <div className={clsx('flex min-w-0 flex-1 flex-col', fullscreen && 'hidden')}>
          <header className="flex items-center gap-2 pr-12 pl-6 pt-3 pb-2">
            <Link
              to="/"
              aria-label="Back to prototype index"
              className="inline-flex size-8 items-center justify-center rounded-aub-sm text-n6 hover:bg-n10 hover:text-f1"
            >
              <Icon name="back" size="lg" />
            </Link>
            <h1 className="t1 truncate text-f1">
              {voyage.vessel} {voyage.voyageNumber} {voyage.route}
            </h1>
            <div className="ml-2 flex items-center gap-1">
              <Icon name="flagged" size="lg" className="text-f1" title="Flagged voyage" />
              <Icon name="validated" size="lg" className="text-f1" title="Validated stowage plan" />
              <Icon name="online" size="lg" className="text-success" title="Vessel online" />
              <button
                type="button"
                onClick={() => setFavourite((f) => !f)}
                aria-pressed={favourite}
                aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
                className={clsx('inline-flex size-8 items-center justify-center rounded-aub-sm hover:bg-p5', 'text-p1')}
              >
                <Icon name="favourite" size="lg" />
              </button>
            </div>
          </header>

          <main className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-12 pl-6 pt-1 pb-6">
            <Banner tone="info">Stowage plan has been changed since last validation.</Banner>
            <OptimizationStatusCard />
            <OptimizerInputCard />
            <CargoesCard />
          </main>

          <footer className="flex items-center justify-between gap-4 border-t border-n8 bg-n12 py-3 pr-12 pl-6 shadow-[0_-2px_6px_0_rgb(15_26_42_/_0.06)]">
            <LinkButton iconLeft="arrowLeft">Back to Booking list</LinkButton>
            <div className="flex items-center gap-3">
              <Button variant="secondary">Save</Button>
              <Button variant="secondary">Review master data</Button>
              <Button variant="primary" onClick={runOptimizer} disabled={running}>
                {running ? 'Running…' : 'Run Optimizer'}
              </Button>
            </div>
          </footer>
        </div>

        {/* Tank grid panel */}
        <aside
          aria-label="Stowage plan"
          className={clsx(
            'relative flex min-w-0 shrink-0 flex-col',
            fullscreen ? 'flex-1' : 'w-[735px] max-w-[42%] min-w-[600px]',
          )}
        >
          {!fullscreen && (
            <div className="absolute top-2 -left-[52px] z-20">
              <FloatingToolbar />
            </div>
          )}
          <TankGrid fullscreen={fullscreen} onToggleFullscreen={() => setFullscreen((f) => !f)} />
          {fullscreen && (
            <IconButton
              icon="close"
              label="Exit full screen"
              onClick={() => setFullscreen(false)}
              className="absolute top-2 right-2 bg-n12 shadow-e02"
            />
          )}
        </aside>
      </div>
    </div>
  )
}

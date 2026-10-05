import type { ReactNode } from 'react'
import { StatusChip } from '../../components/ui/Chip'
import { Icon } from '../../components/ui/Icon'
import { Card } from '../../components/ui/Surface'
import { optimizationStatus as status } from './data'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-[12px] leading-[18px]">
      <dt className="w-[116px] shrink-0 text-f2">{label}</dt>
      <dd className="m-0 font-bold text-f1">{children}</dd>
    </div>
  )
}

export function OptimizationStatusCard() {
  return (
    <Card className="@container">
      <div className="flex flex-col gap-4 p-4 @4xl:flex-row @4xl:items-start @4xl:justify-between">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="t4 text-f1">Last optimization status</h2>
            <StatusChip tone="success">{status.state}</StatusChip>
          </div>
          <dl className="m-0 flex flex-col gap-1">
            <Row label="Status message">{status.message}</Row>
            <Row label="Started">{status.started}</Row>
            <Row label="Started by">{status.startedBy}</Row>
            <Row label="Last status update">{status.lastUpdate}</Row>
            <Row label="Tracking ID">
              <a
                href="#tracking"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-1.5 text-p1 underline-offset-2 hover:underline"
              >
                <Icon name="externalLink" size="xs" inline />
                {status.trackingId}
              </a>
            </Row>
          </dl>
        </div>

        <div className="flex w-full gap-5 rounded-aub-md bg-n11 p-4 @4xl:w-[440px] @4xl:shrink-0">
          <div className="shrink-0">
            <div className="text-[12px] leading-[18px] text-f3">Optimality gap</div>
            <div className="font-sans text-[32px] leading-10 font-bold text-f1">{status.optimalityGap}</div>
          </div>
          <div className="flex flex-col gap-1 text-[12px] leading-[18px]">
            <div className="text-f3">
              Runtime: <span className="font-bold text-f1">{status.runtime}</span>
            </div>
            <p className="m-0 text-f1">
              The stowage plan created by the optimizer is between x.x% and x.xxxx% below the theoretical optimum for
              these cargos, voyages and rules/constraints.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

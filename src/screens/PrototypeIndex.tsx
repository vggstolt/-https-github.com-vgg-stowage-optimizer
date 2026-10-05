import { Link } from 'react-router-dom'
import logomark from '../assets/st-logomark.svg'
import { Icon } from '../components/ui/Icon'
import { Card } from '../components/ui/Surface'
import { screens } from './index'

export function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-n11">
      <header className="border-b border-n8 bg-n12">
        <div className="mx-auto flex max-w-[1104px] items-center gap-4 px-6 py-5">
          <img src={logomark} alt="Stolt Tankers" width={37} height={32} />
          <span className="h-7 w-px bg-n8" aria-hidden />
          <div>
            <h1 className="t1 text-f1">Stowage planning prototype</h1>
            <p className="m-0 text-[14px] leading-5 text-f2">
              Click-through screens built with the ST Tankers AUB design system. Share this URL with the team.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1104px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-col gap-3">
          <h2 className="t4 text-f1">Flow</h2>
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {screens.map((screen) => (
              <li key={screen.path}>
                <Link to={screen.path} className="group block h-full">
                  <Card className="flex h-full flex-col gap-3 p-5 transition-shadow group-hover:shadow-e02">
                    <div className="flex items-center justify-between">
                      <span className="t10 text-f3">Step {screen.flowStep}</span>
                      <span className="inline-flex items-center gap-1 text-[12px] leading-[18px] font-bold text-p1">
                        Open screen
                        <Icon name="externalLink" size="xs" inline />
                      </span>
                    </div>
                    <h3 className="t3 text-f1">{screen.title}</h3>
                    <p className="m-0 text-[14px] leading-5 text-f2">{screen.description}</p>
                  </Card>
                </Link>
              </li>
            ))}
            <li>
              <Card className="flex h-full flex-col justify-center gap-2 border-dashed p-5 text-f3">
                <span className="t10">Next step</span>
                <p className="m-0 text-[14px] leading-5">
                  The next screen in the process flow will appear here once it is shared.
                </p>
              </Card>
            </li>
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="t4 text-f1">Icon rules used in this prototype</h2>
          <Card className="grid grid-cols-1 gap-4 p-5 text-[14px] leading-5 text-f2 md:grid-cols-3">
            <div>
              <div className="t5 text-f1">One registry</div>
              Every icon comes from <code className="text-f1">src/design/icons.ts</code>, referenced by semantic name.
              Screens never import icon packs directly.
            </div>
            <div>
              <div className="t5 text-f1">Fixed sizes</div>
              16px glyph in a 24px box by default (AUB “Icon/FA – Regular”); 12px for inline text and tags, 20px for
              toolbar and header status icons.
            </div>
            <div>
              <div className="t5 text-f1">Colour from tokens</div>
              Icons inherit text colour from AUB tokens only: N6 idle navigation, P1 active and actions, F1 status,
              semantic colours for success and danger.
            </div>
          </Card>
        </section>
      </main>
    </div>
  )
}

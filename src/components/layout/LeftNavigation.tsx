import clsx from 'clsx'
import logomark from '../../assets/st-logomark.svg'
import type { IconName } from '../../design/icons'
import { Icon } from '../ui/Icon'

type NavItem = { icon: IconName; label: string; active?: boolean }

const topItems: NavItem[] = [
  { icon: 'voyages', label: 'Voyages', active: true },
  { icon: 'performance', label: 'Performance' },
  { icon: 'userAdmin', label: 'User administration' },
]

const bottomItems: NavItem[] = [{ icon: 'settings', label: 'Settings' }]

function NavButton({ item }: { item: NavItem }) {
  return (
    <button
      type="button"
      title={item.label}
      aria-label={item.label}
      aria-current={item.active ? 'page' : undefined}
      className="group flex w-full flex-col items-center gap-1 px-6 py-4"
    >
      <Icon
        name={item.icon}
        className={clsx('transition-colors', item.active ? 'text-p1' : 'text-n6 group-hover:text-f1')}
      />
      <span className={clsx('h-1 w-6 rounded-aub-pill', item.active ? 'bg-p1' : 'bg-transparent')} />
    </button>
  )
}

/**
 * LeftNavigation v2.2 — State=Collapsed, Type=Prod (77px wide, N8 right stroke,
 * 24px icon boxes with a 16px glyph, 4px active indicator).
 */
export function LeftNavigation({ userInitials = 'THT' }: { userInitials?: string }) {
  return (
    <nav
      aria-label="Main"
      className="flex h-full w-[77px] shrink-0 flex-col items-center justify-between border-r border-n8 bg-n12"
    >
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full justify-center border-b border-n8 px-5 py-6">
          <img src={logomark} alt="Stolt Tankers" width={37} height={32} />
        </div>
        <div className="flex w-full flex-col pt-2">
          {topItems.map((item) => (
            <NavButton key={item.label} item={item} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        {bottomItems.map((item) => (
          <NavButton key={item.label} item={item} />
        ))}
        <button
          type="button"
          title="Account"
          className="flex size-8 items-center justify-center rounded-full border-2 border-p1 bg-n12 text-[12px] leading-[18px] font-bold text-p1"
        >
          {userInitials}
        </button>
        <button type="button" title="Log out" aria-label="Log out" className="group px-6 py-4">
          <Icon name="logout" className="text-n6 transition-colors group-hover:text-f1" />
        </button>
        <div className="flex w-full flex-col items-center gap-4 px-5 pb-4">
          <span className="h-px w-full bg-n8" />
          <button type="button" title="Expand navigation" aria-label="Expand navigation" className="group">
            <Icon name="expandNav" size="sm" className="text-n6 transition-colors group-hover:text-f1" />
          </button>
        </div>
      </div>
    </nav>
  )
}

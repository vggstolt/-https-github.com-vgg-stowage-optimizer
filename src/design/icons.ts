import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faArrowUpRightFromSquare,
  faAnglesRight,
  faBan,
  faBarsProgress,
  faBell,
  faCheckDouble,
  faChevronDown,
  faChevronLeft,
  faCircleInfo,
  faClockRotateLeft,
  faClipboardCheck,
  faFlagCheckered,
  faGauge,
  faGear,
  faRoute,
  faScaleUnbalanced,
  faTemperatureHalf,
  faThumbtack,
  faUpRightAndDownLeftFromCenter,
  faUserGear,
  faWifi,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots, faCopy, faStar } from '@fortawesome/free-regular-svg-icons'

/**
 * Single source of truth for icons used across AUB prototype screens.
 *
 * The AUB design system draws icons with Font Awesome 6 Pro (Regular, 16px glyph
 * inside a 24px box). Pro is licensed, so the prototype maps every semantic icon
 * name to its closest Font Awesome 6 Free glyph here. Screens must reference icons
 * by semantic name only; never import Font Awesome icons directly in a screen.
 */
export const icons = {
  // Navigation
  back: faChevronLeft,
  arrowLeft: faArrowLeft,
  chevronDown: faChevronDown,
  expandNav: faAnglesRight,
  close: faXmark,

  // Left navigation modules
  voyages: faRoute,
  performance: faGauge,
  userAdmin: faUserGear,
  notifications: faBell,
  settings: faGear,
  logout: faArrowRightFromBracket,

  // Page header status
  flagged: faFlagCheckered,
  validated: faCheckDouble,
  online: faWifi,
  favourite: faStar,

  // Feedback
  info: faCircleInfo,
  externalLink: faArrowUpRightFromSquare,

  // Stowage toolbar
  fullscreen: faUpRightAndDownLeftFromCenter,
  checklist: faClipboardCheck,
  planLayers: faBarsProgress,
  history: faClockRotateLeft,
  copy: faCopy,
  route: faRoute,
  comments: faCommentDots,

  // Tank grid
  temperature: faTemperatureHalf,
  pinned: faThumbtack,
  avoid: faBan,
  weightBalance: faScaleUnbalanced,
} satisfies Record<string, IconDefinition>

export type IconName = keyof typeof icons

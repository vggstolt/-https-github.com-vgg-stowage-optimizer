import type { ComponentType } from 'react'
import { StowageOptimizerScreen } from './stowage-optimizer/StowageOptimizerScreen'

export type PrototypeScreen = {
  path: string
  title: string
  flowStep: number
  description: string
  component: ComponentType
}

/**
 * Prototype flow. Add new screens here as they are designed; the index page and
 * router are generated from this list.
 */
export const screens: PrototypeScreen[] = [
  {
    path: '/stowage-optimizer',
    title: 'Stowage optimizer',
    flowStep: 1,
    description:
      'Voyage stowage plan with last optimization status, optimizer and vessel inputs, cargo-level constraints and the live tank grid.',
    component: StowageOptimizerScreen,
  },
]

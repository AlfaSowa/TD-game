import { EngineContext } from '../../engine-ctx'
import { SystemPriority } from './types'

export interface System {
  priority: SystemPriority

  update?(ctx: EngineContext, dt: number): void

  onRemove?(ctx: EngineContext): void

  init?(ctx: EngineContext): void
}

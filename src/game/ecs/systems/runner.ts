import { Engine } from '../../../engine/core'
import { HealthSystem } from './health-system'

export const systemsRunner = (engine: Engine) => {
  engine.systems.add(new HealthSystem())
}

import { Scene } from '../Scene'
import { World } from './world'

export enum SystemType {
  Update = 'update',
  Draw = 'draw'
}

export const SystemPriority = {
  Highest: -Infinity,
  Higher: -5,
  Average: 0,
  Lower: 5,
  Lowest: Infinity
} as const

export abstract class System {
  abstract readonly systemType: SystemType

  public static priority: number = SystemPriority.Average

  init?(world: World, scene: Scene): void

  abstract update(elapsed: number): void
}

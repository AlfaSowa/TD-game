import { System } from './system'
import { World } from './world'

export interface SystemCtor<T extends System> {
  new (...args: any[]): T
}

export function isSystemConstructor(x: any): x is SystemCtor<System> {
  return !!x?.prototype && !!x?.prototype?.constructor?.name
}

export class SystemManager {
  private readonly _world: World

  public readonly systems: System[] = []
  public initialized = false

  constructor(world: World) {
    this._world = world
  }

  public addSystem(systemOrCtor: SystemCtor<System> | System): void {
    let system: System
    if (systemOrCtor instanceof System) {
      system = systemOrCtor
    } else {
      system = new systemOrCtor(this._world)
    }

    this.systems.push(system)
    this.systems.sort((a, b) => (a.constructor as typeof System).priority - (b.constructor as typeof System).priority)
    if (this.initialized && system.init) {
      system.init(this._world, this._world.scene)
    }
  }
}

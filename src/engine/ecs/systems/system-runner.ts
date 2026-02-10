import { EngineContext } from '../../engine-ctx'
import { System } from './system'
import { SystemPriority } from './types'

export class SystemRunner {
  private systems: System[] = []

  comporator = new Map<SystemPriority, number>()

  public SystemManager() {
    this.comporator.set(SystemPriority.LOW, 1)
    this.comporator.set(SystemPriority.MEDIUM, 2)
    this.comporator.set(SystemPriority.HIGH, 3)
  }

  add<S extends System>(system: S): void {
    this.systems.push(system)
    this.systems.sort((a, b) => {
      console.log(this.comporator.get(a.priority))

      return 0
    })
  }

  init() {
    for (const sistem of this.systems) {
      sistem.init?.()
    }
  }

  update(ctx: EngineContext, dt: number) {
    for (const sistem of this.systems) {
      sistem.update(ctx, dt)
    }
  }
}

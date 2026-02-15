import { EngineContext } from '../../engine-ctx'
import { System } from './system'
import { SystemPriority } from './types'

type SystemConstructor<S extends System> = new (...args: any[]) => S

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
      return this.comporator.get(a.priority)! - this.comporator.get(b.priority)!
    })
  }

  init(ctx: EngineContext) {
    for (const sistem of this.systems) {
      sistem.init?.(ctx)
    }
  }

  get<S extends System>(system: SystemConstructor<S>) {
    return this.systems.find((s) => s.constructor.name === system.name)
  }

  remove<S extends System>(system: SystemConstructor<S>, ctx: EngineContext) {
    const s = this.get(system)
    console.log(s)

    s?.onRemove?.(ctx)
    this.systems = this.systems.filter((s) => !(s instanceof system))
  }

  update(ctx: EngineContext, dt: number) {
    for (const sistem of this.systems) {
      sistem.update?.(ctx, dt)
    }
  }
}

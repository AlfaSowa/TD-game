import { EngineContext } from '../../engine-ctx'
import { System } from './system'
import { SYSTEM_PRIORITY } from './types'

type SystemConstructor<S extends System> = new (...args: any[]) => S

export class SystemRunner {
  private systems: System[] = []

  comporator = new Map<SYSTEM_PRIORITY, number>()

  public SystemManager() {
    this.comporator.set(SYSTEM_PRIORITY.LOW, 1)
    this.comporator.set(SYSTEM_PRIORITY.INTERMEDIATE, 2)
    this.comporator.set(SYSTEM_PRIORITY.SUPPORT, 3)
    this.comporator.set(SYSTEM_PRIORITY.HIGH, 4)
    this.comporator.set(SYSTEM_PRIORITY.DANGER, 5)
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

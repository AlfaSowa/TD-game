import { Application } from 'pixi.js'
import { Entity } from './entity'
import { System } from './system'
import { isSystemConstructor, SystemCtor, SystemManager } from './system-manager'

export class World {
  app: Application = new Application()

  systemManager: SystemManager = new SystemManager(this)

  add(entity: Entity): void
  add(system: System): void
  add(system: SystemCtor<System>): void
  add(entityOrSystem: Entity | System | SystemCtor<System>): void {
    // if (entityOrSystem instanceof Entity) {
    //   this.entityManager.addEntity(entityOrSystem)
    //   return
    // }

    if (entityOrSystem instanceof System || isSystemConstructor(entityOrSystem)) {
      this.systemManager.addSystem(entityOrSystem)
      return
    }
  }
}

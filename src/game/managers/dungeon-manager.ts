import { Container } from 'pixi.js'
import { Engine } from '../../engine/core'
import { UiSlot } from '../../engine/ui'
import { drawSquareFields } from '../../engine/utils'
import { BattleEndSystem, BattleInitSystem, BattleSystem } from '../ecs/systems'

export class DungeonManager {
  static run(engine: Engine, view: Container, field: Container) {
    engine.systems.add(new BattleInitSystem(view, field))
    engine.systems.add(new BattleSystem())
    engine.systems.add(new BattleEndSystem())

    console.log('app', engine.app)
    console.log('world', engine.world)
  }

  static stop(engine: Engine) {
    engine.systems.remove(BattleInitSystem, engine.engineContext)
    engine.systems.remove(BattleSystem, engine.engineContext)
    engine.systems.remove(BattleEndSystem, engine.engineContext)
  }

  static createField(container: Container, rawSize: number) {
    drawSquareFields({
      container: container,
      xAmount: 5,
      gap: 2,
      renderElementFx: () => new UiSlot(rawSize / 5 - (rawSize / 100) * 4, rawSize / 5 - (rawSize / 100) * 4)
    })
  }
}

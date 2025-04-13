import { Forest, ResourceTree } from '../entities'
import { BaseEntity } from '../entities/base'
import { Game } from '../game'
import { BuildingsSystem } from './buildings-system'
import { ScreensSystem } from './screens-system'
import { SpawnersSystem } from './spawners-system'
import { System } from './types'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 10

const mockData = [
  {
    type: 'Castle',
    position: { x: 500, y: 500 },
    level: 3
  }
]

export class PossessionScreenSystem implements System {
  public static SYSTEM_ID = 'possession-system'

  game!: Game

  updatingItems: BaseEntity[] = []

  init() {
    this.initBuilding()
    this.initPhaseEntities()
  }

  initBuilding() {
    mockData.map((params) => {
      const tmpElement = this.game.systems.get(BuildingsSystem).getClass(params)

      this.game.systems.get(ScreensSystem).addContainer(tmpElement, 'possession')

      this.updatingItems.push(tmpElement)

      tmpElement.init()
    })
  }

  initPhaseEntities() {
    const forest = this.game.systems.get(BuildingsSystem).getClass<Forest>({
      type: 'Forest',
      position: { x: 500, y: 500 }
    })

    this.game.systems.get(ScreensSystem).addContainer(forest, 'possession')

    this.updatingItems.push(forest)

    forest.init()

    forest.spawner = this.game.systems.get(SpawnersSystem).createSpawner<ResourceTree>({
      container: forest,
      maxElementsOnView: MAX_SPAW_ELEMENTS,
      render: () => {
        return forest.createTree()
      },
      interval: SPAWN_INTERVAL,
      isInfinity: false,
      isFilling: false,
      place: {
        distance: {
          min: 100,
          max: 500
        }
      }
    })

    forest.addSpawnerToStage()
  }

  update() {
    for (const element of this.updatingItems) {
      element.update()
    }
  }
}

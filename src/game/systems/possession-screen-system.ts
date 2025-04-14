import { Forest, ResourceTree } from '../entities'
import { BaseEntity } from '../entities/base'
import { Game } from '../game'
import { BuildingsSystem } from './buildings-system'
import { LevelingSystem } from './leveling-system'
import { ScreensSystem } from './screens-system'
import { SpawnersSystem } from './spawners-system'
import { System } from './types'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 10

export class PossessionScreenSystem implements System {
  public static SYSTEM_ID = 'possession-system'

  game!: Game
  updatingItems: BaseEntity[] = []

  data!: any

  init() {
    this.data = this.game.systems.get(LevelingSystem).getSystemData('buildings')

    this.initBuilding()
    this.initPhaseEntities()
  }

  initBuilding() {
    this.data.map((params: any) => {
      const tmpElement = this.game.systems.get(BuildingsSystem).getClass(params)

      this.game.systems.get(ScreensSystem).addContainer(tmpElement, 'possession')

      this.updatingItems.push(tmpElement)

      tmpElement.init()
    })
  }

  initPhaseEntities() {
    const castle = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'Castle')

    //TODO подумать как отрисовывать Entity/Entities в зависимости от левела другой Entity
    //TODO подумать как удалять Entity/Entities в зависимости от левела другой Entity
    if (castle.level.value === 0) {
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
  }

  update() {
    for (const element of this.updatingItems) {
      element.update()
    }
  }
}

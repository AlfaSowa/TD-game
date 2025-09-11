import { BaseEntity } from '../base'
import { Game } from '../game'
import { EntitiesRenderSystem } from './entities-render-system'
import { ScreensSystem } from './screens-system'
import { System } from './types'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 10

export class PossessionScreenSystem implements System {
  public static SYSTEM_ID = 'possession-system'

  game!: Game
  updatingItems: BaseEntity[] = []

  init() {
    this.game.systems.get(EntitiesRenderSystem).signals.onUpdatePossessionData.connect((type) => {
      const id = this.updatingItems.find((i) => i?.type === type)?.uid
      this.updatingItems = this.updatingItems.filter((i) => i?.type !== type)

      if (id) {
        this.game.systems.get(ScreensSystem).removeContainer('possession', id)
      }
    })
  }

  initPhaseEntities() {
    for (const element of this.updatingItems) {
      // if (element instanceof Forest) {
      //   element.spawner = this.game.systems.get(SpawnersSystem).createSpawner<ResourceTree>({
      //     container: element,
      //     maxElementsOnView: MAX_SPAW_ELEMENTS,
      //     render: () => {
      //       return element.createTree()
      //     },
      //     interval: SPAWN_INTERVAL,
      //     isInfinity: false,
      //     isFilling: false,
      //     place: {
      //       distance: {
      //         min: 100,
      //         max: 500
      //       }
      //     }
      //   })
      //   element.addSpawnerToStage()
      // }
    }
  }

  update() {
    // for (const element of this.updatingItems) {
    //   element.update()
    // }
  }
}

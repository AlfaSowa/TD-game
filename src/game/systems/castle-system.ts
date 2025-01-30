import { isContainersCollision, moveContainerToContainer, randomNumber } from '../../utils'
import { Castle, Resource } from '../entities'
import { Game } from '../game'
import { Spawner } from '../helpers'
import { LevelingSystem } from './leveling-system'
import { ScreensSystem } from './screens-system'
import { SpawnersSystem } from './spawners-system'
import { System } from './types'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 10
export class CastleSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: Castle
  spawner!: Spawner<Resource>

  init() {
    const config = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'Castle')

    this.castle = new Castle({ game: this.game, config })
    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')
    this.castle.init()

    this.spawner = this.game.systems.get(SpawnersSystem).createSpawner<Resource>({
      maxElements: MAX_SPAW_ELEMENTS,
      render: () => {
        const r = Math.random()

        const woodResource = new Resource({
          game: this.game,
          onUpdate: (resource) => {
            if (resource.isAnimated) {
              if (!isContainersCollision(resource, this.castle, 40)) {
                moveContainerToContainer(resource, this.castle, 3)
              } else {
                resource.remove()
              }
            }
          },
          onRemove: () => {
            this.castle.updateResources()
          }
        })

        woodResource.x = 500 + randomNumber([150, 300]) * Math.sin(360 / r)
        woodResource.y = 500 + randomNumber([150, 300]) * Math.cos(360 / r)

        woodResource.init()

        return woodResource
      },
      interval: SPAWN_INTERVAL,
      isInfinity: false
    })

    this.game.systems.get(ScreensSystem).addContainer(this.spawner, 'possession')
  }

  update() {
    this.castle.update()
  }
}

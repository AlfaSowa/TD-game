import { isContainersColision, moveElementToContainer, randomNumber } from '../../utils'
import { Castle, Resource } from '../entities'
import { Game } from '../game'
import { Spawner } from '../helpers'
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
    this.castle = new Castle({ game: this.game })
    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')
    this.castle.init()

    this.spawner = this.game.systems.get(SpawnersSystem).createSpawner<Resource>({
      maxElements: MAX_SPAW_ELEMENTS,
      render: () => {
        const r = Math.random()

        const woodResource = new Resource({
          game: this.game,
          onUpdate: () => {
            if (woodResource.isAnimated) {
              if (!isContainersColision(woodResource, this.castle, 10, 10)) {
                moveElementToContainer(woodResource, this.castle, 5)
              } else {
                woodResource.remove()
              }
            }
          }
        })

        woodResource.init()
        woodResource.x = 500 + randomNumber([150, 400]) * Math.sin(360 / r)
        woodResource.y = 500 + randomNumber([150, 400]) * Math.cos(360 / r)

        return woodResource
      },
      interval: SPAWN_INTERVAL,
      isInfinity: false
    })

    this.game.systems.get(ScreensSystem).addContainer(this.spawner, 'possession')
  }

  // update() {
  //   this.castle.update()
  // }
}

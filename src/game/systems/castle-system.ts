import { randomNumber } from '../../utils'
import { Game } from '../game'
import { Spawner } from '../helpers'
import { Castle, Wood } from '../objects'
import { ScreensSystem } from './screens-system'
import { SpawnersSystem } from './spawners-system'
import { System } from './types'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 10
export class CastleSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: Castle
  spawner!: Spawner<Wood>

  init() {
    this.castle = new Castle({ game: this.game })
    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')
    this.castle.init()

    this.spawner = this.game.systems.get(SpawnersSystem).createSpawner({
      maxElements: MAX_SPAW_ELEMENTS,
      render: () => {
        const r = Math.random()

        const woodResource = new Wood({ game: this.game })
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

  update() {
    this.castle.update()
  }
}

import { City } from '../entities'
import { Game } from '../game'

import { ScreensSystem } from './screens-system'
import { System } from './types'

export class CitySystem implements System {
  public static SYSTEM_ID = 'city'

  game!: Game
  city!: City

  init() {
    this.city = new City({ game: this.game })

    this.game.systems.get(ScreensSystem).addContainer(this.city, 'map')

    this.city.init()
  }

  // update() {
  //   this.city.update()
  // }
}

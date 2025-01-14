import { City } from '../entities'
import { Game } from '../game'
import { LevelingSystem } from './leveling-system'

import { ScreensSystem } from './screens-system'
import { System } from './types'

export class CitySystem implements System {
  public static SYSTEM_ID = 'city'

  game!: Game
  city!: City

  init() {
    const config = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'City')

    this.city = new City({ game: this.game, config })
    this.city.init()

    this.game.systems.get(ScreensSystem).addContainer(this.city, 'map')
  }

  // update() {
  //   this.city.update()
  // }
}

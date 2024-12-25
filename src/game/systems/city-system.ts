import { Game } from '../game'
import { City } from '../objects'
import { CastleSystem } from './castle-system'

import { ScreensSystem } from './screens-system'
import { TimersSystem } from './timers-system'
import { System } from './types'

export class CitySystem implements System {
  public static SYSTEM_ID = 'city'

  castleTimerId: number = 0

  game!: Game
  city!: City

  init() {
    this.city = new City({ game: this.game })

    console.log('this.city', this.city)

    this.game.systems.get(ScreensSystem).addContainer(this.city, 'map')

    this.city.init()
  }

  timerUpdate() {
    const timerId = this.game.systems.get(CastleSystem).timerId

    if (timerId) {
      const t = this.game.systems.get(TimersSystem).getTimerById(timerId)

      if (t) {
        this.city.updateText(String(Math.floor(t.timer.getTimeRemaining / 1000) % 60))
      }
    }
  }

  update() {
    this.timerUpdate()
    this.city.update()
  }
}

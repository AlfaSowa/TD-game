import { Game } from '../game'
import { Castle } from '../objects'
import { ScreensSystem } from './screens-system'
import { TimersSystem } from './timers-system'
import { System } from './types'

export class CastleSystem implements System {
  public static SYSTEM_ID = 'castle'

  timerId: number = 0

  game!: Game

  castle!: Castle

  init() {
    this.castle = new Castle({ game: this.game })

    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')

    this.castle.init()

    this.timerId = this.game.systems.get(TimersSystem).addTimer(10000)

    const t = this.game.systems.get(TimersSystem).getTimerById(this.timerId)
    t?.timer.start()
  }

  timerUpdate() {
    if (this.timerId) {
      const t = this.game.systems.get(TimersSystem).getTimerById(this.timerId)

      if (t) {
        this.castle.updateText(String(Math.floor(t.timer.getTimeRemaining / 1000) % 60))
      } else {
        this.timerId = 0
      }
    }
  }

  update() {
    this.timerUpdate()

    this.castle.update()
  }
}

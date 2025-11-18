import { Signal } from 'typed-signals'
import { removeElementFromArray } from '../../utils'
import { Game } from '../game'
import { Timer } from '../helpers'
import { System } from './types'

export class TimersSystem implements System {
  public static SYSTEM_ID = 'timers'
  nextId: number = 0

  game!: Game

  private timers: { timer: Timer; timerId: number }[] = []

  public signals = {
    onObserveTimer: new Signal<(timerId: number) => void>()
  }

  addTimer(duration: number) {
    this.nextId++
    const timer = new Timer()
    timer.setup(duration)
    timer.start()

    this.timers.push({ timer, timerId: this.nextId })

    return this.nextId
  }

  getTimerById(timerId: number) {
    return this.timers.find((t) => t.timerId === timerId)
  }

  update() {
    for (const t of this.timers) {
      t.timer.update(this.game.app.ticker.deltaMS)

      if (!t.timer.isRunning) {
        removeElementFromArray(this.timers, t)
      }
    }
  }
}

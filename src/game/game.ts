import { Signal } from 'typed-signals'
import { Engine } from '../engine/core'

export class Game {
  engine: Engine = new Engine()
  isStarted: boolean = false

  public signals = {
    onGameStarted: new Signal<(isStarted: boolean) => void>()
  }

  async init() {
    const canvasWrapper = document.getElementById('canvas-wrapper')

    if (canvasWrapper) {
      this.isStarted = true
      this.signals.onGameStarted.emit(true)

      this.engine.init(canvasWrapper, this.update)
    }
  }

  update(dt: number) {}
}

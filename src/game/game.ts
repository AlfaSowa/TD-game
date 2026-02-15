import { Signal } from 'typed-signals'
import { Engine, IGame } from '../engine/core'
import { systemsRunner } from './ecs/systems'
import { scenesRunner } from './scenes/runner'

export class Game implements IGame {
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

      //----- SYSTEMS -----
      systemsRunner(this.engine)

      //----- ENGINE INIT -----
      await this.engine.init(canvasWrapper)

      //----- SCENES -----
      scenesRunner(this.engine)

      console.log(this.engine.app)

      this.engine.start(this.update)
    }
  }

  update(dt: number) {}
}

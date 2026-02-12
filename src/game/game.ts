import { Signal } from 'typed-signals'
import { Engine, IGame } from '../engine/core'
import { MapScene } from './scenes'
import { MainMenuScene } from './scenes/main-menu-scene'

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

      await this.engine.init(canvasWrapper)

      this.engine.sceneManager.add(MainMenuScene, false)
      this.engine.sceneManager.add(MapScene)

      this.engine.sceneManager.loadScene(MainMenuScene)

      console.log(this.engine.app)

      this.engine.start(this.update)
    }
  }

  update(dt: number) {}
}

import { Container } from 'pixi.js'
import { Game } from '../../game'
import { IBaseGameObject } from '../../types'

export class BaseResources extends Container implements IBaseGameObject {
  game: Game
  private resources: number = 100

  constructor({ game }: IBaseGameObject) {
    super()
    this.game = game
  }

  init() {
    this.game.app.stage.addChild(this)
  }

  public takeResources(value: number) {
    this.resources -= value
    if (this.resources < 0) {
      this.destroy()
    }
  }

  update() {}
}

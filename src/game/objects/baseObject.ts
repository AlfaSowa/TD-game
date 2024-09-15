import { Container } from 'pixi.js'
import { Game } from '../game'
import { IBaseGameObject } from '../types'

export class BaseGameObject extends Container implements IBaseGameObject {
  game: Game

  constructor({ game }: IBaseGameObject) {
    super()
    this.game = game
  }

  init() {
    this.game.app.stage.addChild(this)
  }
}

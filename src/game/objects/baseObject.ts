import { Container } from 'pixi.js'
import { Game } from '../game'
import { IBaseGameObject } from '../types'

export class BaseGameObject extends Container implements IBaseGameObject {
  game: Game

  constructor({ game }: IBaseGameObject) {
    super()
    this.game = game
  }

  add(parent: Container) {
    if (!this.parent) {
      console.log('add')
      parent.addChild(this)
    }
  }

  remove() {
    if (this.parent) {
      console.log('remove')
      this.removeFromParent()
    }
  }

  init() {}
}

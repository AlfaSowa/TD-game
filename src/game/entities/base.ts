import { Container } from 'pixi.js'
import { Game } from '../game'

interface IBaseEntity {
  game: Game

  add: (parent: Container) => void
  remove: () => void

  init?: () => void
  update?: () => void
}

export class BaseEntity extends Container implements IBaseEntity {
  game: Game

  constructor({ game }: { game: Game }) {
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
}

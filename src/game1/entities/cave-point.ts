import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { BaseEntityConstructor } from './base'

export class CavePoint extends Container {
  game: Game

  constructor({ game }: BaseEntityConstructor) {
    super()
    this.game = game
  }

  clicked(callback: (e: any) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this)
    })

    return this
  }

  init() {
    const graphics = new Graphics().rect(0, 0, 100, 100).fill({ color: '#f1f1f1' })

    this.addChild(graphics)
  }
}

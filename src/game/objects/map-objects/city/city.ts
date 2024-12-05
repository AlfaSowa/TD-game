import { Graphics } from 'pixi.js'
import { Game } from '../../..'
import { ScreensSystem } from '../../../systems'
import { BaseMapObject } from '../base'

export class City extends BaseMapObject {
  constructor({ game }: { game: Game }) {
    super({ game })

    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', (e) => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
    })
  }

  init() {
    this.addChild(new Graphics().rect(0, 0, 50, 50).fill({ color: 'rgba(149, 138, 122)' }))

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  update() {}
}

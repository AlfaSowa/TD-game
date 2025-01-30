import { Graphics } from 'pixi.js'
import { ScreensSystem } from '../systems'
import { BaseEntity } from './base'

export class City extends BaseEntity {
  async init() {
    // const texture = await Assets.loadBundle(['default'])
    // const sprite = new Sprite(texture.default[this.config.image])
    const sprite = new Graphics().rect(0, 0, 150, 150).fill({ color: 'green' })

    sprite.eventMode = 'static'
    sprite.cursor = 'pointer'

    sprite.on('pointerup', (e) => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
    })

    this.addChild(sprite)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }
}

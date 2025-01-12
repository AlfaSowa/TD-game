import { Assets, Sprite } from 'pixi.js'
import CastleImage from '../../assets/images/House_Red.png'
import { ScreensSystem } from '../systems'
import { BaseEntity } from './base'

export class City extends BaseEntity {
  async init() {
    const texture = await Assets.load(CastleImage)
    const sprite = new Sprite(texture)

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

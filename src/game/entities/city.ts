import { Assets, Sprite } from 'pixi.js'
import { LevelingSystem, ScreensSystem } from '../systems'
import { BaseEntity } from './base'

export class City extends BaseEntity {
  async init() {
    const config = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'City')

    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default['camp.png'])

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

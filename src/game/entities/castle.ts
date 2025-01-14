import { Assets, Sprite } from 'pixi.js'
import { BaseEntity } from './base'

export class Castle extends BaseEntity {
  async init() {
    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default[this.config.image])

    this.addChild(sprite)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }

    console.log(this.config)
  }
}

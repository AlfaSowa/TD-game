import { Assets, Graphics, Sprite } from 'pixi.js'
import { Resource } from './resource'

export class ResourceTree extends Resource {
  async init() {
    const texture = await Assets.loadBundle(['default'])

    const sprite = new Sprite(texture.default['Tree1.png'])
    // const sprite6 = new Sprite(texture.default['Tree1Shadow.png'])

    // sprite.anchor.set(0.5)
    // sprite6.anchor.set(0.5)

    // sprite6.y = sprite.height - sprite6.width / 2

    this.addChild(sprite)

    const boundingBox = new Graphics().rect(0, 0, this.width, this.height).stroke({ color: 'red' })

    // this.addChild(boundingBox)
  }
}

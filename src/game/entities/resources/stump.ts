import { Assets, Sprite } from 'pixi.js'
import { Resource } from './resource'

export class ResourceStump extends Resource {
  async init() {
    const texture = await Assets.loadBundle(['default'])

    const sprite = new Sprite(texture.default['Tree2.png'])
    sprite.anchor.set(0.5)

    this.addChild(sprite)

    return this
  }
}

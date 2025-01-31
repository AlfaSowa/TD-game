import { Assets, Sprite } from 'pixi.js'
import { Resource } from './resource'

export class ResourceTree extends Resource {
  async init() {
    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default['Tree1.png'])

    this.addChild(sprite)
  }
}

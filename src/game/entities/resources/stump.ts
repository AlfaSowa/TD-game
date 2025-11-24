import { Assets, Sprite } from 'pixi.js'
import { BaseResources } from './base'

export class ResourceStump extends BaseResources {
  alias = 'stump-resource'

  async init() {
    const texture = await Assets.loadBundle(['default'])

    const sprite = new Sprite(texture.default['Tree2.png'])

    this.addChild(sprite)

    return this
  }
}

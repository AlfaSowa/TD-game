import { Assets, Sprite } from 'pixi.js'
import { BaseBuilding } from './base'

export class Sawmill extends BaseBuilding {
  async init() {
    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default['Tower_Blue.png'])

    this.addChild(sprite)

    this.position.set(800, 700)
  }
}

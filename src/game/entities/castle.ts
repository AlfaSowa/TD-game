import { Assets, Sprite } from 'pixi.js'
import { AbilitiesSystem } from '../systems'
import { BaseEntity } from './base'

export class Castle extends BaseEntity {
  async init() {
    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default[this.config.image])

    this.abilities = this.game.systems.get(AbilitiesSystem).createAbilitiesContainer(['BaseAbility'])

    console.log(this.abilities)

    this.addChild(this.abilities)

    this.addChild(sprite)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }

    console.log(this.config)
  }
}

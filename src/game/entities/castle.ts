import { Graphics } from 'pixi.js'
import { AbilitiesSystem } from '../systems'
import { BaseEntity } from './base'

export class Castle extends BaseEntity {
  async init() {
    // const texture = await Assets.loadBundle(['default'])
    // const sprite = new Sprite(texture.default[this.config.image])
    const sprite = new Graphics().rect(0, 0, 150, 150).fill({ color: 'gray' })
    const sprite1 = new Graphics().rect(0, 0, 10, 10).fill({ color: 'red' })

    this.abilities = this.game.systems.get(AbilitiesSystem).createAbilitiesContainer(['BaseAbility'])

    this.addChild(this.abilities)

    this.addChild(sprite)

    this.addChild(sprite1)
    sprite1.position.set(sprite1.parent.width / 2 - sprite1.width / 2, sprite1.parent.height / 2 - sprite1.height / 2)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  updateResources() {
    console.log('updateResources')
  }
}

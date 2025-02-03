import { AnimatedSprite, Assets, Graphics, Spritesheet } from 'pixi.js'
import { AbilitiesSystem } from '../systems'
import { BaseEntity } from './base'

const atlasData = {
  frames: {
    firecamp1: {
      frame: { x: 0, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 }
    },
    firecamp2: {
      frame: { x: 32, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0, w: 32, h: 32 }
    }
  },
  meta: {
    image: 'images/firecamp.png',
    size: { w: 32, h: 32 },
    scale: 1
  },
  animations: {
    enemy: ['firecamp1', 'firecamp2'] //array of frames by name
  }
}

export class Castle extends BaseEntity {
  async init() {
    const texture = await Assets.loadBundle(['default'])

    const sprite12 = new Graphics().rect(0, 0, 150, 150).fill({ color: 'gray' })
    // this.addChild(sprite12)

    const spritesheet = new Spritesheet(texture.default['firecamp.png'], atlasData)

    await spritesheet.parse()
    const anim = new AnimatedSprite(spritesheet.animations.enemy)
    anim.animationSpeed = 0.1

    anim.play()
    this.addChild(anim)

    this.abilities = this.game.systems.get(AbilitiesSystem).createAbilitiesContainer(['BaseAbility'])

    this.addChild(this.abilities)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  updateResources() {
    console.log('updateResources')
  }
}

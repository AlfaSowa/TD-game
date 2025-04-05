import { AnimatedSprite, Assets, Spritesheet } from 'pixi.js'
import { AbilitiesSystem, LevelingSystem } from '../systems'
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

// const a = [
//   {
//     type: 'Castle',
//     position: {
//       x: 100,
//       y: 100
//     }
//   },
//   {
//     type: 'Farm',
//     position: {
//       x: 200,
//       y: 200
//     }
//   }
// ]

// class Render {
//   b = {
//     ['Castle']: new Castle(),
//     ['Farm']: new Farm()
//   }

//   getClass(type) {
//     return b[type]
//   }
// }

export class Castle extends BaseEntity {
  async init() {
    const config = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'Castle')

    const texture = await Assets.loadBundle(['default'])

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

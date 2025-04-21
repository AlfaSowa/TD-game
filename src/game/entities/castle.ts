import { AnimatedSprite, Assets, Spritesheet } from 'pixi.js'
import { AbilitiesSystem, ScreensSystem } from '../systems'
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
    this.clicked(() => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('castle')
    })

    console.log('this.level', this.level)

    const texture = await Assets.loadBundle(['default'])

    const spritesheet = new Spritesheet(texture.default['firecamp.png'], atlasData)

    await spritesheet.parse()
    const anim = new AnimatedSprite(spritesheet.animations.enemy)
    anim.animationSpeed = 0.1

    anim.play()

    this.addChild(anim)

    this.abilities = this.game.systems.get(AbilitiesSystem).createAbilitiesContainer(['BaseAbility'])

    this.addChild(this.abilities)
  }

  updateResources() {
    console.log('updateResources')
  }
}

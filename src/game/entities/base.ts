import { Container } from 'pixi.js'

import { Game } from '../game'

interface IBaseEntity {
  game: Game

  add: (parent: Container) => void
  remove: () => void

  init?: () => void
  update?: () => void
}

interface ContainerWithUpdate extends Container {
  update?: () => void
}

export interface BaseEntityConstructor {
  game: Game
}

export class BaseEntity extends Container implements IBaseEntity {
  game: Game

  children: ContainerWithUpdate[] = []

  type?: string

  constructor({ game }: BaseEntityConstructor) {
    super()
    this.game = game
  }

  clicked(callback: (e: any) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this)
    })

    return this
  }

  add(parent: Container) {
    if (!this.parent) {
      parent.addChild(this)
    }
  }

  remove() {
    if (this.parent) {
      this.removeFromParent()
      this.destroy()
    }
  }

  update() {}

  init() {}
}

import { Container } from 'pixi.js'

import { BaseSpell } from '../entities'
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

  abilities!: Container

  children: ContainerWithUpdate[] = []

  type?: string

  private _level: number = 1

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

  abilitiesUpdate() {
    for (const ability of this.abilities.children) {
      if (ability instanceof BaseSpell) {
        ability.update()
      }
    }
  }

  add(parent: Container) {
    if (!this.parent) {
      console.log('add')
      parent.addChild(this)
    }
  }

  remove() {
    if (this.parent) {
      this.removeFromParent()
      this.destroy()
    }
  }

  update() {
    if (this.abilities) {
      this.abilitiesUpdate()
    }
  }

  set level(value: number) {
    this._level = value
  }

  get level() {
    return this._level
  }

  init() {}
}

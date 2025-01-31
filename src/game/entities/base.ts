import { Container } from 'pixi.js'
import { BaseAbility } from '../abilities'
import { Game } from '../game'

type ConfigEntityType = any
interface IBaseEntity {
  game: Game
  config: ConfigEntityType

  add: (parent: Container) => void
  remove: () => void

  init?: () => void
  update?: () => void
}

interface IBaseEntityCustom extends IBaseEntity {}

export class BaseEntity extends Container implements IBaseEntity {
  game: Game
  private _config: ConfigEntityType
  abilities!: Container

  constructor({ game, config }: { game: Game; config?: any }) {
    super()
    this.game = game
    this.config = config
  }

  abilitiesUpdate() {
    for (const ability of this.abilities.children) {
      if (ability instanceof BaseAbility) {
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
      console.log('remove')
      this.removeFromParent()
      this.destroy()
    }
  }

  get config(): ConfigEntityType {
    return this._config
  }

  set config(value: ConfigEntityType) {
    this._config = value
  }

  update() {
    if (this.abilities) {
      this.abilitiesUpdate()
    }
  }
}

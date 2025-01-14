import { Container } from 'pixi.js'
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

export class BaseEntity extends Container implements IBaseEntity {
  game: Game
  private _config: ConfigEntityType

  constructor({ game, config }: { game: Game; config?: any }) {
    super()
    this.game = game
    this.config = config
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
    }
  }

  get config(): ConfigEntityType {
    return this._config
  }

  set config(value: ConfigEntityType) {
    this._config = value
  }
}

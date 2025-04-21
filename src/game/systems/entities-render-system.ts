import { Signal } from 'typed-signals'
import { Castle, Forest } from '../entities'
import { BaseEntity } from '../entities/base'
import { Game } from '../game'
import { System } from './types'

type Entity = {
  [key: string]: BaseEntity
}

type GetClassType = {
  type: string
  position?: {
    x: number
    y: number
  }
  level?: {
    value: number
    next: {
      wood: number
      gold: number
      stone: number
      food: number
    }
  }
}

type AddNewEntityType = {
  type: string
  position: { x: number; y: number }
}

type RemoveEntityType = {
  type: string
  screen: string
}

export class EntitiesRenderSystem implements System {
  public static SYSTEM_ID = 'entities-render-system'
  game!: Game

  private entities!: Entity
  private _possessionData: any

  public signals = {
    onUpdatePossessionData: new Signal<(type: string) => void>()
  }

  init() {
    this.entities = {
      ['Castle']: new Castle({ game: this.game }),
      ['Forest']: new Forest({ game: this.game })
    }
  }

  set possessionData(value: any) {
    this._possessionData = value
  }

  get possessionData() {
    return this._possessionData
  }

  createEntity<T extends BaseEntity>({ type, position, level }: GetClassType): T {
    const entity = this.entities[type]

    entity.type = type

    if (level) {
      entity.level = level.value
    }

    if (position) {
      entity.position.set(position.x, position.y)
    }

    return entity as T
  }

  addNewEntityOnScreen({ position, type }: AddNewEntityType) {
    //TODO mock
    new Promise((resolve) => {
      console.log(`запрос на добавление ${type} на позицию ${position}`)

      setTimeout(() => {
        resolve(console.log(`запрос на добавление ${type} выполнен`))
      }, 1000)
    }).then(() => {
      console.log(`addNewEntityOnScreen выполнен`)
    })
  }

  removeEntityFromScreen({ type, screen }: RemoveEntityType) {
    //TODO mock
    new Promise((resolve) => {
      console.log(`запрос на удаление ${type}`)

      setTimeout(() => {
        if (screen === 'possession') {
          this._possessionData = this._possessionData.filter((i: any) => i.type !== type)
          this.signals.onUpdatePossessionData.emit(type)
        }

        resolve(console.log(`запрос на удаление ${type} выполнен`))
      }, 1000)
    }).then(() => {
      console.log(`removeEntityFromScreen выполнен`)
    })
  }
}

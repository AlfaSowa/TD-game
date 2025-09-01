import { Assets, Container, Sprite } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Castle, Cave } from '../entities'
import { BaseEntity } from '../entities/base'
import { Game } from '../game'
import { ScreensSystem } from './screens-system'
import { System } from './types'

type Entity = {
  [key: string]: BaseEntity
}

type GetClassType = {
  type: string
  level?: {
    value: number
    next: {
      wood: number
      gold: number
      stone: number
      food: number
    }
  }
  abilities?: string[]
  image: string
  position: { x: number; y: number }
  container: 'possession' | 'map'
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
      ['Cave']: new Cave({ game: this.game })
    }
  }

  set possessionData(value: any) {
    this._possessionData = value
  }

  get possessionData() {
    return this._possessionData
  }

  async renderEntities(data: GetClassType[]) {
    data.map(async (params: GetClassType) => {
      const element = await this.createEntity(params)

      if (element) {
        this.game.systems.get(ScreensSystem).addContainer(element, params.container)

        element.init()
      }
    })
  }

  async createEntity<T extends BaseEntity>({ type, position, level, image }: GetClassType): Promise<T> {
    const entity = this.entities[type]

    if (entity) {
      entity.type = type

      if (level) {
        entity.level = level.value
      }

      if (position) {
        entity.position.set(position.x, position.y)
      }

      if (image) {
        await this.initImg(image, entity)
      }
    }

    return entity as T
  }

  async initImg(img: string, entity: Container) {
    const sheet = await Assets.loadBundle(['default'])

    const sprite = new Sprite(sheet.default[img])

    entity.addChild(sprite)
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

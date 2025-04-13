import { Castle } from '../entities'
import { BaseEntity } from '../entities/base'
import { Game } from '../game'
import { System } from './types'

type RendererEntitiesType = 'Cow'

type Entity = {
  [key in RendererEntitiesType]: BaseEntity
}

export class ItemsSystem implements System {
  public static SYSTEM_ID = 'items'
  game!: Game

  private entities!: Entity

  init() {
    this.entities = {
      ['Cow']: new Castle({ game: this.game })
    }
  }

  getClass<T extends BaseEntity>(
    type: RendererEntitiesType,
    position?: {
      x: number
      y: number
    }
  ): T {
    const entity = this.entities[type]
    entity.init()

    if (position) {
      entity.position.set(position.x, position.y)
    }

    return entity as T
  }
}

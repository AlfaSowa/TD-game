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
  level?: number
}

export class BuildingsSystem implements System {
  public static SYSTEM_ID = 'buildings'
  game!: Game

  private entities!: Entity

  init() {
    this.entities = {
      ['Castle']: new Castle({ game: this.game }),
      ['Forest']: new Forest({ game: this.game })
    }
  }

  getClass<T extends BaseEntity>({ type, position, level }: GetClassType): T {
    const entity = this.entities[type]

    if (level) {
      entity.level = level
    }

    if (position) {
      entity.position.set(position.x, position.y)
    }

    return entity as T
  }
}

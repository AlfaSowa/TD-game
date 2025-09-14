import { Container } from 'pixi.js'
import { BaseUnit } from '../base'
import { Game } from '../game'
import { FighterUnit, MageUnit } from '../units'

interface DungeonFieldConstructor {
  game: Game
}

type Unit = {
  [key: string]: BaseUnit
}

export type FieldType = {
  isFree: boolean
  type: string
}

export class DungeonField extends Container {
  game: Game

  private entities!: Unit

  constructor({ game }: DungeonFieldConstructor) {
    super()
    this.game = game
  }

  init() {
    this.entities = {
      ['Mage']: new MageUnit({ game: this.game }),
      ['Fighter']: new FighterUnit({ game: this.game })
    }
  }

  clicked(callback: (e: any) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this)
    })

    return this
  }

  async drawContent(field: FieldType) {
    if (field) {
      const entity = this.entities[field.type]

      if (entity) {
        entity.init()

        if (!field.isFree) {
          this.addChild(entity)
        }
      }
    }
  }

  focus() {}
}

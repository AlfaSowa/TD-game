import { Container, Graphics } from 'pixi.js'
import { BaseUnit } from '../base'
import { Game } from '../game'
import { CaveScreenSystem } from '../systems'

interface DungeonFieldConstructor {
  game: Game
}

export type FieldType = {
  isFree: boolean
  type: string
}

export class DungeonField extends Container {
  game: Game

  owner!: BaseUnit
  isSelected: boolean = false

  constructor({ game }: DungeonFieldConstructor) {
    super()
    this.game = game
  }

  clicked(callback: (e: DungeonField, f: BaseUnit) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this, this.owner)
    })

    return this
  }

  select(uid: number) {
    if (uid === this.uid) {
      this.isSelected = true
      for (const element of this.children) {
        if (element instanceof Graphics) {
          const size = element.width
          element.clear()
          element.rect(0, 0, size, size).fill({ color: '#FF8073' }).stroke(0x00ff00)
        }
      }
    } else {
      if (this.isSelected) {
        this.isSelected = false
        for (const element of this.children) {
          if (element instanceof Graphics) {
            const size = element.width
            element.clear()
            element.rect(0, 0, size, size).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
          }
        }
      }
    }
  }

  drawContent(field: FieldType) {
    if (field) {
      const entity = this.game.systems.get(CaveScreenSystem).entities[field.type]()

      if (entity) {
        if (!field.isFree) {
          entity.init()

          this.owner = entity
          this.addChild(entity)

          entity.position.set(this.width / 2 - entity.width / 2, this.height / 2 - entity.height / 2)
        }
      }
    }
  }
}

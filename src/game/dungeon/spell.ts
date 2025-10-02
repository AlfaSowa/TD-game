import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { DangeonSystem } from '../systems'

interface SpellFieldConstructor {
  game: Game
}

export type DangeonSpellType = {
  type: string | null
}

export class SpellField extends Container {
  game: Game

  isSelected: boolean = false

  constructor({ game }: SpellFieldConstructor) {
    super()
    this.game = game
  }

  clicked(callback: (e: SpellField) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this)
    })

    return this
  }

  select(uid: number) {
    if (uid === this.uid) {
      if (!this.isSelected) {
        this.isSelected = true
        for (const element of this.children) {
          if (element instanceof Graphics) {
            const size = element.width - 1
            element.clear()
            element.rect(0, 0, size, size).fill({ color: '#399200' }).stroke(0x00ff00)
          }
        }
      }

      return this
    } else {
      if (this.isSelected) {
        this.isSelected = false
        for (const element of this.children) {
          if (element instanceof Graphics) {
            const size = element.width - 1
            element.clear()
            element.rect(0, 0, size, size).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
          }
        }
      }
    }

    return null
  }

  drawContent(field: DangeonSpellType) {
    console.log('field', field)

    if (field.type) {
      const entity = this.game.systems.get(DangeonSystem).spells[field.type]()

      if (entity) {
        entity.init()

        this.addChild(entity)

        entity.position.set(this.width / 2 - entity.width / 2, this.height / 2 - entity.height / 2)
      }
    }
  }
}

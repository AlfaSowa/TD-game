import { Container } from 'pixi.js'
import { Game } from '../../game'
import { Cell, Grid } from '../../ui'

interface SpellFieldConstructor {
  game: Game
}

export type DangeonSpellType = {
  type: string | null
}

const FIELDS = 6
export class SpellsMap extends Container {
  game: Game

  fieldSelected: Cell | null = null

  pWidth: number = 0

  grid: Grid = new Grid()

  constructor({ game }: SpellFieldConstructor) {
    super()
    this.game = game
  }

  init() {
    this.pWidth = this.parent.width / FIELDS

    this.grid.init(() => this.renderField(), this.pWidth, FIELDS, 1)

    this.grid.position.set(0, this.game.app.canvas.height - this.grid.height)

    this.addChild(this.grid)
  }

  renderField() {
    const element = new Cell()

    element.updateGraphics(this.pWidth)

    element.clicked((f, o) => {
      //показать контейнер клетки
      console.log(f)
      //показать содержимое контейнера клетки
      console.log(o)

      for (const element of this.grid.children) {
        if (element instanceof Cell) {
          const selected = element.select(f.uid)
          if (selected) {
            this.fieldSelected = selected
          }
        }
      }
    })

    return element
  }
}

import { Container, Graphics } from 'pixi.js'

import { Game } from '../../game'
import { Cell, Grid } from '../../ui'
import { DangeonSpellType } from './spell'

interface DungeonMapConstructor {
  game: Game
}

const spellsArray: DangeonSpellType[] = [{ type: 'MeleeAttack' }]

const QUEUE = 6
const SPELLS = 6
const FIELDS = 4
const SPELL_PANEL_POSITION_Y = 80
const FIELDS_PANEL_POSITION_Y = 160

export class DungeonMap extends Container {
  game: Game

  isReady: boolean = false

  plug: Graphics = new Graphics().rect(0, 0, 100, 100).fill({ color: '#f1f1f1' })

  fieldSelected: Cell | null = null

  pWidth: number = 0

  grid: Grid = new Grid()

  constructor({ game }: DungeonMapConstructor) {
    super()
    this.game = game
  }

  init() {
    this.pWidth = this.parent.width / FIELDS

    this.grid.init(() => this.renderField(), this.pWidth, FIELDS)

    this.grid.position.set(0, 0)

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

import { Container, Graphics } from 'pixi.js'

import { Game } from '../../game'
import { drawSquareFields } from '../../helpers'
import { DangeonEnemiesType, DungeonField } from './field'
import { DangeonSpellType, SpellField } from './spell'

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

  spellPanel: Container = new Container()
  fielsPanel: Container = new Container()

  buttonsGroup: Container = new Container()

  fieldSelected: DungeonField | null = null
  spellSelected: SpellField | null = null

  pWidth: number = 0

  constructor({ game }: DungeonMapConstructor) {
    super()
    this.game = game
  }

  init() {
    this.initFields()
  }

  initFields() {
    this.pWidth = this.parent.width / FIELDS

    drawSquareFields<DangeonEnemiesType, DungeonField>({
      container: this.fielsPanel,
      fieldSize: this.pWidth,
      xAmount: FIELDS,
      renderElementFx: () => this.renderField()
    })

    this.fielsPanel.position.set(0, FIELDS_PANEL_POSITION_Y)

    this.addChild(this.fielsPanel)
  }

  renderField() {
    const element = new DungeonField({ game: this.game })

    element.updateGraphics(this.pWidth)

    element.clicked((f, o) => {
      //показать контейнер клетки
      console.log(f)
      //показать содержимое контейнера клетки
      console.log(o)

      for (const element of this.fielsPanel.children) {
        if (element instanceof DungeonField) {
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

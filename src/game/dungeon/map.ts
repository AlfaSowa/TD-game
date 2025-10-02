import { Button } from '@pixi/ui'
import { Container, Graphics, Text } from 'pixi.js'
import { Game } from '../game'
import { drawSquareFields } from '../helpers'
import { DangeonSystem } from '../systems'
import { DangeonEnemiesType, DungeonField } from './field'
import { DangeonSpellType, SpellField } from './spell'

interface DungeonMapConstructor {
  game: Game
}

const fieldsArray: DangeonEnemiesType[] = [
  { type: null },
  { type: null },
  { type: null },
  { type: null },
  { type: 'Mage' },
  { type: null },
  { type: null },
  { type: 'Fighter' },
  { type: null },
  { type: null },
  { type: null },
  { type: null },
  { type: null },
  { type: 'Fighter' },
  { type: null },
  { type: null },
  { type: null },
  { type: 'Fighter' },
  { type: null },
  { type: null },
  { type: 'Mage' },
  { type: null },
  { type: null },
  { type: null },
  { type: null }
]

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

  constructor({ game }: DungeonMapConstructor) {
    super()
    this.game = game
  }

  init() {
    const bg = new Graphics().rect(0, 0, this.parent.width, this.parent.height).fill({ color: '#85004B' })

    this.addChild(bg)

    this.checkIsReady()

    this.initSpellPanel()
    this.initFields()

    this.renderButtons()

    setTimeout(() => {
      this.plug.removeFromParent()
      this.startRound()
    }, 500)
  }

  startRound() {
    console.log('startRound')
    this.fillData()
    this.addChild(this.spellPanel, this.fielsPanel, this.buttonsGroup)
  }

  fillData() {
    console.log('fillData')
  }

  checkIsReady() {
    if (!this.isReady) {
      this.plug.position.set(this.parent.width / 2 - 50, this.parent.height / 2 - 50)

      this.addChild(this.plug)
    }
  }

  initSpellPanel() {
    const pWidth = this.parent.width / SPELLS

    drawSquareFields<DangeonSpellType, SpellField>({
      container: this.spellPanel,
      fieldSize: pWidth,
      NumberOfCols: pWidth,
      xAmount: SPELLS,
      yAmount: 1
    })

    this.spellPanel.position.set(0, SPELL_PANEL_POSITION_Y)
  }

  renderSpell() {
    const element = new SpellField({ game: this.game })

    element.clicked((f) => {
      console.log(f)

      for (const element of this.spellPanel.children) {
        if (element instanceof SpellField) {
          const selected = element.select(f.uid)

          if (selected) {
            this.spellSelected = selected
          }
        }
      }
    })

    return element
  }

  postRenderSpell(elem: SpellField, field: DangeonSpellType) {
    if (field) {
      elem.drawContent(field)
    }
  }

  initFields() {
    const pWidth = this.parent.width / FIELDS

    drawSquareFields<DangeonEnemiesType, DungeonField>({
      container: this.fielsPanel,
      fieldSize: pWidth,
      NumberOfCols: pWidth,
      xAmount: FIELDS
    })

    this.fielsPanel.position.set(0, FIELDS_PANEL_POSITION_Y)
  }

  renderField(field: DangeonEnemiesType) {
    const element = new DungeonField({ game: this.game })

    element.clicked((f, o) => {
      console.log(f)
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

  postRenderField(elem: DungeonField, field: DangeonEnemiesType) {
    if (field) {
      elem.drawContent(field)
    }
  }

  renderButtons() {
    const buttonView = new Container()
    const buttonBg = new Graphics().rect(0, 0, 100, 50).fill(0xffffff)
    const textInstance = new Text({ text: 'ХОД' })
    // textInstance.anchor.set(0.5)
    buttonView.addChild(buttonBg, textInstance)

    const button = new Button(buttonView)
    button.onPress.connect(() => {
      if (this.fieldSelected && this.spellSelected) {
        this.game.systems.get(DangeonSystem).signals.onInteraction.emit(this.fieldSelected, this.spellSelected)
      }
    })

    this.buttonsGroup.addChild(button.view)

    const gap = this.parent.height - (FIELDS_PANEL_POSITION_Y + this.fielsPanel.height)

    this.buttonsGroup.position.set(25, this.parent.height - gap / 2 - 25)
  }
}

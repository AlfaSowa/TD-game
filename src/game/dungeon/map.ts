import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { drawSquareFields } from '../helpers'
import { DungeonField, FieldType } from './field'

interface DungeonMapConstructor {
  game: Game
}

const fieldsArray = [
  { isFree: true, type: 'Fighter' },
  { isFree: true, type: 'Fighter' },
  { isFree: false, type: 'Mage' },
  { isFree: true, type: 'Fighter' },
  { isFree: true, type: 'Fighter' },
  { isFree: false, type: 'Fighter' },
  { isFree: false, type: 'Mage' },
  { isFree: true, type: 'Fighter' },
  { isFree: true, type: 'Mage' }
]

const ROWS = 5

export class DungeonMap extends Container {
  game: Game

  isReady: boolean = false

  plug: Graphics = new Graphics().rect(0, 0, 100, 100).fill({ color: '#f1f1f1' })

  constructor({ game }: DungeonMapConstructor) {
    super()
    this.game = game
  }

  init() {
    const bg = new Graphics().rect(0, 0, this.parent.width, this.parent.height).fill({ color: '#85004B' })

    this.addChild(bg)

    this.checkIsReady()

    this.initFields()
  }

  checkIsReady() {
    if (!this.isReady) {
      this.plug.position.set(this.parent.width / 2 - 50, this.parent.height / 2 - 50)

      this.addChild(this.plug)
    }
  }

  initFields() {
    const pWidth = this.parent.width / ROWS

    const fields = drawSquareFields({
      fieldsArray,
      pWidth,
      squareSize: pWidth,
      xAmount: ROWS,
      renderContainer: (field) => this.renderField(field)
    })

    setTimeout(() => {
      this.plug.removeFromParent()
      this.addChild(...fields)
    }, 2000)
  }

  renderField(field: FieldType) {
    const element = new DungeonField({ game: this.game })

    element.init()

    element.clicked((f) => {
      console.log(f)
    })

    element.drawContent(field)

    return element
  }
}

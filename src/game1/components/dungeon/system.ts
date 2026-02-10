import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Game } from '../../game'
import { Player } from '../../player'
import { System } from '../../systems'
import { Cell } from '../../ui'
import { DungeonMap } from './map'
import { SpellField } from './spell'

export class DungeonSystem implements System {
  public static SYSTEM_ID = 'dangeon-system'

  game!: Game

  queue: Container[] = []
  currentMover: Container | null = null

  map: DungeonMap | null = null

  private player!: Player

  public signals = {
    onInteraction: new Signal<(field: Cell, spell: SpellField) => void>()
  }

  constructor() {
    this.signals.onInteraction.connect((field, spell) => {
      this.interaction(field, spell)
    })
  }

  startRound() {
    console.log('startRound', this.queue)
  }

  roll() {}

  gameQueue() {}

  interaction(field: Cell, spell: SpellField) {
    console.log('spell', spell)
    console.log('field', field)
  }

  reset() {
    this.queue = []
    this.currentMover = null
  }
}

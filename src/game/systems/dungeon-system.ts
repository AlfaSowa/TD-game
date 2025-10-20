import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { BaseSpell, BaseUnit } from '../base'
import { DungeonField } from '../dungeon/field'
import { SpellField } from '../dungeon/spell'
import { Game } from '../game'
import { MeleeAttack } from '../spells'
import { FighterUnit, MageUnit } from '../units'
import { System } from './types'

type Units = {
  [key: string]: () => BaseUnit
}

type Spells = {
  [key: string]: () => BaseSpell
}

export class DungeonSystem implements System {
  public static SYSTEM_ID = 'dangeon-system'

  game!: Game

  entities!: Units
  spells!: Spells

  queue: Container[] = []
  currentMover: Container | null = null

  public signals = {
    onInteraction: new Signal<(field: DungeonField, spell: SpellField) => void>()
  }

  constructor() {
    this.signals.onInteraction.connect((field, spell) => {
      this.interaction(field, spell)
    })
  }

  init() {
    this.entities = {
      ['Mage']: () => new MageUnit({ game: this.game }),
      ['Fighter']: () => new FighterUnit({ game: this.game })
    }

    this.spells = {
      ['MeleeAttack']: () => new MeleeAttack({ game: this.game })
    }
  }

  fillQueue(containers: Container[]) {
    for (const element of containers) {
      this.queue.push(element)
    }
  }

  roll() {}

  gameQueue() {}

  interaction(field: DungeonField, spell: SpellField) {
    console.log('spell', spell)
    console.log('field', field)
  }
}

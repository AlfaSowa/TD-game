import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { DungeonMap } from '../components'
import { DangeonEnemiesType, DungeonField } from '../components/dungeon/field'
import { SpellField } from '../components/dungeon/spell'
import { BaseEntity, BaseSpell, FighterUnit, MageUnit, MeleeAttack } from '../entities'
import { Game } from '../game'
import { PlayerSystem } from './player-system'
import { System } from './types'

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

type Units = {
  [key: string]: () => BaseEntity
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

  map: DungeonMap | null = null

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

  preparingMap(container: Container) {
    this.initMap(container)
    this.initPlayer()
    this.fillData()
  }

  initMap(container: Container) {
    this.map = new DungeonMap({ game: this.game })
    container.addChild(this.map)

    this.map.init()
  }

  initPlayer() {
    const player = this.game.systems.get(PlayerSystem).getPlayer()
    this.fillQueue(player)
  }

  fillData() {
    if (this.map) {
      for (const [index, container] of this.map.fielsPanel.children.entries()) {
        const field = fieldsArray[index]

        if (field?.type && container instanceof DungeonField) {
          const entity = this.entities[field.type]()

          if (entity) {
            if (entity instanceof BaseEntity) {
              this.fillQueue(entity)
            }

            entity.init()
            container.owner = entity
            container.addChild(entity)
          }
        }
      }
    }
  }

  fillQueue(container: Container) {
    console.log('fillQueue')
    this.queue.push(container)
  }

  startRound() {
    console.log('startRound', this.queue)
  }

  roll() {}

  gameQueue() {}

  interaction(field: DungeonField, spell: SpellField) {
    console.log('spell', spell)
    console.log('field', field)
  }

  reset() {
    this.queue = []
    this.currentMover = null
  }
}

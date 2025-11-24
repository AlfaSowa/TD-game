import { Application, Container, Graphics } from 'pixi.js'

import { DungeonMap, SpellsMap } from '../../components'
import { BaseSpell, BaseUnit } from '../../entities'
import { Player, PlayerSystem } from '../../player'
import { EntitiesRenderSystem, InteractionSystem } from '../../systems'
import { Cell } from '../../ui'
import { BaseScreen } from '../base'

const fieldsArray: any[] = [
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
export class DungeonScreen extends BaseScreen {
  SCREEN_NAME = 'dungeon-map-screen'

  queue: Container[] = []

  map: DungeonMap | null = null

  spells: SpellsMap | null = null

  private player!: Player

  init(app: Application) {
    console.log('dungeon-map-screen init')

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, app.canvas.width, app.canvas.height).fill({ color: '#9F3ED5' })
    )

    //TODO TEST
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      //TODO придумать как сделать тобы не указывать типы
      const spell = this.spells?.fieldSelected?.owner as BaseSpell
      const target = this.map?.fieldSelected?.owner as BaseUnit

      if (spell && target) {
        this.game.systems.get(InteractionSystem).interaction(spell, target)
      }
    })

    this.addChild(this.activeContainer)

    return this
  }

  preparingMap(container: Container) {
    this.initMap(container)
    this.initSpells(container)
    this.initPlayer()

    this.fillMap()
    this.fillSpells()
  }

  initMap(container: Container) {
    this.map = new DungeonMap({ game: this.game })
    container.addChild(this.map)

    this.map.init()
  }

  initSpells(container: Container) {
    this.spells = new SpellsMap({ game: this.game })
    container.addChild(this.spells)

    this.spells.init()
  }

  initPlayer() {
    this.player = this.game.systems.get(PlayerSystem).getPlayer()
    this.fillQueue(this.player)

    console.log('this.player', this.player)
  }

  fillMap() {
    if (this.map) {
      for (const [index, container] of this.map.grid.children.entries()) {
        const field = fieldsArray[index]

        if (field?.type && container instanceof Cell) {
          const entity = this.game.systems.get(EntitiesRenderSystem).createUnitByAlias(field?.type)

          if (entity) {
            if (entity instanceof BaseUnit) {
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

  fillSpells() {
    if (this.spells) {
      for (const [index, container] of this.spells.grid.children.entries()) {
        const entity = this.player.spells[index]

        if (entity && container instanceof Cell) {
          entity.init()
          container.owner = entity
          container.addChild(entity)
        }
      }
    }
  }

  fillQueue(container: Container) {
    console.log('fillQueue')
    this.queue.push(container)
  }

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
  }

  onLoad() {
    console.log('DungeonScreen onLoad')
    this.preparingMap(this.activeContainer)
  }

  update() {}
}

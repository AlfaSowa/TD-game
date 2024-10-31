import { Signal } from 'typed-signals'
import { state } from '../../core'
import { debounce, Vector2 } from '../../utils'
import { colorTheme } from '../constants'
import { Game } from '../game'
import { Farm } from '../objects'
import { FarmTile } from '../objects/buildings/farm/farm-tile'
import { System } from './types'

export class FarmSystem implements System {
  public static SYSTEM_ID = 'farm'

  game!: Game

  farm!: Farm

  tilesIds: string[] = []

  public signals = {
    onFarmTileClick: new Signal<(id: string) => void>(),
    onUpdateDateFarm: new Signal<() => void>(),
    onCreateDateFarm: new Signal<() => void>()
  }

  constructor() {
    this.signals.onFarmTileClick.connect((id) => {
      if (!this.tilesIds.includes(id)) {
        this.tilesIds.push(id)
      }

      this.checkTileById(this.tilesIds)
    })

    this.signals.onCreateDateFarm.connect(() => {
      this.createFarmGrid()
    })

    this.signals.onUpdateDateFarm.connect(() => {
      this.updateFarmGrid()
    })
  }

  checkTileById = debounce((ids) => {
    this.tilesIds = []
    this.game.mediator.updateFarmTilesFx(ids)
  }, 1000)

  init() {
    this.game.mediator.getFarmByUserFx()

    this.farm = new Farm({ game: this.game })

    this.farm.init()
  }

  updateFarmGrid() {
    const data = state.getFarmData.data

    for (const container of this.farm.children) {
      if (container instanceof FarmTile) {
        const child = data.find((elem: any) => elem.id === container.id)

        if (child) {
          container.isPlanted = child.isPlanted
          container.isReady = child.isReady

          const color = child.isPlanted ? (child.isReady ? 'blue' : colorTheme.odd) : colorTheme.main
          container.graphics.clear()
          container.graphics.rect(0, 0, container.size, container.size).fill({ color: color })
        }
      }
    }
  }

  createFarmGrid() {
    const data = state.getFarmData.data

    for (let i = 0; i < data.length; i++) {
      const fatmTile = new FarmTile({
        game: this.game,
        position: new Vector2(i % 3, i / 3),
        gap: this.farm.gap,
        data: data[i]
      })
      this.farm.addChild(fatmTile)
      fatmTile.init()
    }

    this.farm.position.set(
      this.game.app.canvas.width / 2 - this.farm.width / 2,
      this.game.app.canvas.height / 2 - this.farm.height / 2
    )
  }

  update() {
    this.farm.update()
  }
}

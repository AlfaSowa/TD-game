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
    onTileClick: new Signal<(id: string) => void>(),
    onUpdateFarm: new Signal<() => void>(),
    onInitFarm: new Signal<() => void>()
  }

  constructor() {
    this.signals.onTileClick.connect((id) => {
      if (!this.tilesIds.includes(id)) {
        this.tilesIds.push(id)
      }

      this.handleTileClick(this.tilesIds)
    })

    this.signals.onInitFarm.connect(() => {
      this.initFarm()
    })

    this.signals.onUpdateFarm.connect(() => {
      this.updateFarm()
    })
  }

  init() {
    this.game.mediator.initFarmFx()

    this.farm = new Farm({ game: this.game })
    this.farm.init()
  }

  handleTileClick = debounce((ids) => {
    this.tilesIds = []
    this.game.mediator.updateFarmFx(ids)
  }, 1000)

  updateFarm() {
    const data = state.farm.data

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

  initFarm() {
    const data = state.farm.data

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

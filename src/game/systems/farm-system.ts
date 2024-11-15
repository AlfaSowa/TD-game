import { Graphics } from 'pixi.js'
import { Signal } from 'typed-signals'
import { state } from '../../core'
import { debounce, Vector2 } from '../../utils'
import { colorTheme } from '../constants'
import { Game } from '../game'
import { Farm } from '../objects'
import { FarmTile } from '../objects/buildings/farm/farm-tile'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class FarmSystem implements System {
  public static SYSTEM_ID = 'farm'

  game!: Game

  farm!: Farm

  tilesIds: string[] = []

  public signals = {
    onTileClick: new Signal<(id: string) => void>(),
    onUpdateFarm: new Signal<() => void>(),
    onInitFarm: new Signal<() => void>(),
    onToggleFarm: new Signal<(value: boolean) => void>()
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

    this.signals.onToggleFarm.connect((value) => {
      if (value) {
        this.openFarm()
      } else {
        this.closeFarm()
      }
    })
  }

  openFarm() {
    console.log('openFarm')

    this.farm.addChild(new Graphics().rect(-Math.random() * 100, -Math.random() * 100, 200, 200).fill({ color: 'red' }))
    // this.farm.add(this.game.app.stage)
    console.log(this.farm.children)
  }

  closeFarm() {
    console.log('closeFarm')
    // this.farm.remove()
  }

  init() {
    this.game.mediator.initFarmFx()

    this.farm = new Farm({ game: this.game })
    // this.farm.add(this.game.app.stage)
    this.game.systems.get(ScreensSystem).addContainer(this.farm, 'possession')

    this.farm.init()
    this.farm.updateFarmPosition()
  }

  handleTileClick = debounce((ids) => {
    this.tilesIds = []
    this.game.mediator.updateFarmFx(ids)
  }, 3000)

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
          container.graphics.rect(child.x, child.y, container.size, container.size).fill({ color: color })
        }
      }
    }

    this.farm.updateFarmPosition()
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

    this.farm.updateFarmPosition()

    console.log(this.farm)
  }

  update() {
    this.farm.update()
  }
}

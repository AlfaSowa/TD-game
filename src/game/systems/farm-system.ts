import { Signal } from 'typed-signals'
import { state } from '../../core'
import { Vector2 } from '../../utils'
import { colorTheme } from '../constants'
import { Game } from '../game'
import { Farm } from '../objects'
import { FarmTile } from '../objects/buildings/farm/farm-tile'
import { System } from './types'

export class FarmSystem implements System {
  public static SYSTEM_ID = 'farm'

  game!: Game

  farm!: Farm

  public signals = {
    onFarmTileClick: new Signal<(id: string) => void>(),
    onUpdateDateFarm: new Signal<(data: any[]) => void>(),
    onCreateDateFarm: new Signal<() => void>()
  }

  constructor() {
    this.signals.onFarmTileClick.connect((id) => {
      this.checkTileById(id)
    })

    this.signals.onCreateDateFarm.connect(() => {
      this.createFarmGrid()
    })

    this.signals.onUpdateDateFarm.connect((data) => {
      this.updateFarmGrid(data)
    })
  }

  private checkTileById(id: string) {
    this.game.mediator.updateFarmTilesFx(id)
  }

  init() {
    console.log(1)

    this.game.mediator.getFarmByUserFx()

    this.farm = new Farm({ game: this.game })
    console.log('this.farm', this.farm)

    this.farm.init()
  }

  updateFarmGrid(updatedData: any[]) {
    for (const container of this.farm.children) {
      if (container instanceof FarmTile) {
        const child = updatedData.find((elem: any) => elem.id === container.id)

        if (child?.isPlanted) {
          container.graphics.clear()
          container.graphics.rect(0, 0, container.size, container.size).fill({ color: colorTheme.odd })
        }
      }
    }
  }

  createFarmGrid() {
    const data = state.getFarmData.data

    console.log('state.getFarmData', data)

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

    this.updateFarmPosition()

    console.log(this.farm)
  }

  updateFarmPosition() {
    this.farm.position.set(
      this.game.app.canvas.width / 2 - this.farm.width / 2,
      this.game.app.canvas.height / 2 - this.farm.height / 2
    )
  }

  update() {
    this.farm.update()
  }
}

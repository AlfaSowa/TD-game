import { Signal } from 'typed-signals'
import { state } from '../../core'
import { Vector2 } from '../../utils'
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
    onUpdateDateFarm: new Signal<() => void>()
  }

  constructor() {
    this.signals.onFarmTileClick.connect((id) => {
      this.checkTileById(id)
    })

    this.signals.onUpdateDateFarm.connect(() => {
      this.createFarmGrid()
    })
  }

  private checkTileById(id: string) {
    console.log('onFarmTileClick:id', id)
  }

  init() {
    console.log(1)

    this.game.mediator.getFarmByUserFx()

    this.farm = new Farm({ game: this.game })
    console.log('this.farm', this.farm)

    this.farm.init()
  }

  createFarmGrid() {
    console.log(2)
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

  updateFarmGrid() {
    console.log('this.farm.children', this.farm.children)
  }

  update() {
    this.farm.update()
  }
}

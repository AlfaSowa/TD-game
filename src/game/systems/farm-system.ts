import { Signal } from 'typed-signals'
import { Game } from '../game'
import { Farm, FarmTileType } from '../objects'
import { System } from './types'

export class FarmSystem implements System {
  public static SYSTEM_ID = 'farm'

  game!: Game

  farm!: Farm

  public signals = {
    onFarmTileClick: new Signal<(id: string) => void>()
  }

  constructor() {
    this.signals.onFarmTileClick.connect((id) => {
      this.checkTileById(id)
    })
  }

  private checkTileById(id: string) {
    console.log('onFarmTileClick:id', id)
  }

  private async getFarmData(): Promise<FarmTileType[][]> {
    //!TODO fake data for tests
    return await new Promise((resolve) =>
      resolve([
        [{ id: '0' }, { id: '1' }, { id: '2' }],
        [{ id: '3' }, { id: '4' }, { id: '5' }],
        [{ id: '6' }, { id: '7' }, { id: '8' }]
      ])
    )
  }

  async init() {
    await this.getFarmData().then((data) => {
      console.log('farm data from backend', data)

      this.farm = new Farm({ game: this.game, data })
      this.farm.init()
      console.log(this.farm)
    })
  }

  update() {
    this.farm.update()
  }
}

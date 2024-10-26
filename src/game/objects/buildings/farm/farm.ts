import { Vector2 } from '../../../../utils'
import { Game } from '../../../game'
import { BaseBuild } from '../base'
import { FarmTile } from './farm-tile'
import { FarmTileType } from './types'

interface IFarm {
  game: Game
  data: FarmTileType[][]
}

export class Farm extends BaseBuild {
  gap: number = 2

  constructor({ game, data }: IFarm) {
    super({ game })

    for (let i = 0; i < data.length; i++) {
      for (let y = 0; y < data[i].length; y++) {
        const fatmTile = new FarmTile({
          game: this.game,
          position: new Vector2(y % data[i].length, i),
          gap: this.gap,
          data: data[i][y]
        })
        this.addChild(fatmTile)
        fatmTile.init()
      }
    }

    this.position.set(game.app.canvas.width / 2 - this.width / 2, game.app.canvas.height / 2 - this.height / 2)
  }

  update() {}
}

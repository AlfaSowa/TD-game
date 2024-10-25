import { Vector2 } from '../../../../utils'
import { Game } from '../../../game'
import { BaseBuild } from '../base'
import { FarmTile } from './farm-tile'

interface IFarm {
  game: Game
}

export class Farm extends BaseBuild {
  gap: number = 2
  tilesInRow: number = 6
  tilesInColumn: number = 6
  maxTiles: number = this.tilesInRow * this.tilesInColumn

  constructor({ game }: IFarm) {
    super({ game })

    for (let i = 0; i < this.maxTiles; i++) {
      const fatmTile = new FarmTile({
        game: this.game,
        position: new Vector2(i % this.tilesInRow, i / this.tilesInRow),
        gap: this.gap
      })
      this.addChild(fatmTile)
      fatmTile.init()
    }

    this.position.set(game.app.canvas.width / 2 - this.width / 2, game.app.canvas.height / 2 - this.height / 2)
  }

  update() {}
}

import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { TAIL_SIZE, colorTheme } from '../../constants'
import { BaseBuild } from './base'

// const setWalls = (wallSize: number, factor: number) => {
//   return [
//     [-wallSize * factor, 0],
//     [-wallSize * factor, wallSize],
//     [-wallSize * factor, -wallSize],
//     [wallSize * factor, 0],
//     [wallSize * factor, wallSize],
//     [wallSize * factor, -wallSize],
//     [0, wallSize * factor],
//     [wallSize, wallSize * factor],
//     [-wallSize, wallSize * factor],
//     // [-wallSize / 2, -wallSize / 2 - wallSize * factor],
//     [wallSize, -wallSize * factor],
//     [-wallSize, -wallSize * factor]
//   ]
// }

interface ICastle {
  game: Game
}

export class Castle extends BaseBuild {
  size: number = TAIL_SIZE * 2
  walls: number[][] = []

  constructor({ game }: ICastle) {
    super({ game })

    this.position.set(game.scene.app.canvas.width / 2 - this.size / 2, game.scene.app.canvas.height / 2 - this.size / 2)

    this.addChild(new Graphics().rect(0, 0, this.size, this.size).fill(colorTheme.primary))
  }

  update() {}
}

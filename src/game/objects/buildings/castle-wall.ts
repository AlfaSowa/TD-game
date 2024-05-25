import { Graphics } from 'pixi.js'
import { Game } from '../../game'
import { BaseBuild } from './base'
import { TAIL_SIZE, colorTheme } from '../../constants'

interface ICastelWall {
  game: Game
  x: number
  y: number
}

export class CastelWall extends BaseBuild {
  constructor({ game, x, y }: ICastelWall) {
    super({ game })
    this.position.set(x, y)

    this.addChild(new Graphics().rect(0, 0, TAIL_SIZE, TAIL_SIZE).fill(colorTheme.main))
  }
}

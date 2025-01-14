import { Graphics } from 'pixi.js'
import { colorTheme } from '../../constants'
import { Game } from '../../game'

import { delayToCallback, randomNumber } from '../../../utils'
import { createTriangle } from '../../../utils/draw'
import { BaseResources } from './base'

interface IForest {
  game: Game
}

export class Forest extends BaseResources {
  isFull: boolean = false
  radius: number = 50

  matrix: any[] = [0, 1, 2, 3, 4, 5, 6]

  constructor({ game }: IForest) {
    super({ game })

    this.position.set(10 + this.radius, 10 + this.radius)
  }

  addNewForestTile = delayToCallback(this.game.app.ticker.deltaMS, 100, () => {
    const matrixTmp = this.matrix.filter((i) => i !== 'true')
    const positionOnCircle = matrixTmp[randomNumber([-1, matrixTmp.length])]

    this.matrix[positionOnCircle] = 'true'

    if (positionOnCircle === 0) {
      this.addChild(new ForestTile({ radius: this.radius / 3, x: 0, y: 0, game: this.game }))
    } else {
      const x = (this.radius / 3) * 2 * Math.sin((positionOnCircle * 60 * Math.PI) / 180)
      const y = (this.radius / 3) * 2 * Math.cos((positionOnCircle * 60 * Math.PI) / 180)
      this.addChild(new ForestTile({ radius: this.radius / 3, x: x, y: y, game: this.game }))
    }
  })

  update() {
    if (this.children.length < this.matrix.length && !this.isFull) {
      this.addNewForestTile()
      this.isFull = true
    }

    if (this.children.length >= this.matrix.length && !this.isFull) {
      this.isFull = true
    }
  }
}

interface IForestTile {
  x: number
  y: number
  radius: number
  game: Game
}

export class ForestTile extends BaseResources {
  constructor({ x, y, radius, game }: IForestTile) {
    super({ game })

    const triangle = createTriangle(0, 0, colorTheme.primary, radius)

    this.position.set(x, y)
    this.addChild(triangle)
    this.addChild(new Graphics().rect(-1, 0, 2, radius - 4).fill(colorTheme.primary))
  }
}

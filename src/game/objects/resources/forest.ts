import { Container, Graphics, Triangle } from 'pixi.js'
import { Game } from '../../game'
import { colorTheme } from '../../constants'
import { delayToCallback, randomNumber } from '../../utils'
import { createTriangle } from '../../utils/draw'

interface IForest {
  game: Game
  x: number
  y: number
}

export class Forest extends Container {
  game: Game
  radius: number = 50

  matrix: any[] = [0, 1, 2, 3, 4, 5, 6]

  constructor({ game, x, y }: IForest) {
    super()

    this.game = game

    this.position.set(x, y)
  }

  addNewForestTile = delayToCallback(() => {
    const matrixTmp = this.matrix.filter((i) => i !== 'true')
    const positionOnCircle = matrixTmp[randomNumber([-1, matrixTmp.length])]

    this.matrix[positionOnCircle] = 'true'

    if (positionOnCircle === 0) {
      this.addChild(new ForestTile({ game: this.game, radius: this.radius / 3, x: 0, y: 0 }))
    } else {
      const x = (this.radius / 3) * 2 * Math.sin((positionOnCircle * 60 * Math.PI) / 180)
      const y = (this.radius / 3) * 2 * Math.cos((positionOnCircle * 60 * Math.PI) / 180)
      this.addChild(new ForestTile({ game: this.game, radius: this.radius / 3, x: x, y: y }))
    }
  })

  update() {
    if (this.children.length <= this.matrix.length) {
      this.addNewForestTile(100)
    }
  }
}

interface IForestTile {
  game: Game
  x: number
  y: number
  radius: number
}

export class ForestTile extends Container {
  game: Game

  resources: number = 100

  constructor({ game, x, y, radius }: IForestTile) {
    super()

    const triangle = createTriangle(0, 0, colorTheme.primary, radius)

    this.game = game
    this.position.set(x, y)
    this.addChild(triangle)
  }

  getResources(value: number) {
    this.resources -= value
    if (this.resources < 0) {
      this.destroy()
    }
  }
}

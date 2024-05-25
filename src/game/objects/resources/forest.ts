import { Container, Graphics } from 'pixi.js'
import { colorTheme } from '../../constants'
import { delayToCallback, randomNumber } from '../../utils'
import { createTriangle } from '../../utils/draw'

export class Forest extends Container {
  radius: number = 50

  matrix: any[] = [0, 1, 2, 3, 4, 5, 6]

  constructor() {
    super()
    this.position.set(100, 100)
  }

  addNewForestTile = delayToCallback(() => {
    const matrixTmp = this.matrix.filter((i) => i !== 'true')
    const positionOnCircle = matrixTmp[randomNumber([-1, matrixTmp.length])]

    this.matrix[positionOnCircle] = 'true'

    if (positionOnCircle === 0) {
      this.addChild(new ForestTile({ radius: this.radius / 3, x: 0, y: 0 }))
    } else {
      const x = (this.radius / 3) * 2 * Math.sin((positionOnCircle * 60 * Math.PI) / 180)
      const y = (this.radius / 3) * 2 * Math.cos((positionOnCircle * 60 * Math.PI) / 180)
      this.addChild(new ForestTile({ radius: this.radius / 3, x: x, y: y }))
    }
  })

  update() {
    if (this.children.length <= this.matrix.length) {
      this.addNewForestTile(100)
    }
  }
}

interface IForestTile {
  x: number
  y: number
  radius: number
}

export class ForestTile extends Container {
  private resources: number = 100

  constructor({ x, y, radius }: IForestTile) {
    super()

    const triangle = createTriangle(0, 0, colorTheme.primary, radius)

    this.position.set(x, y)
    this.addChild(triangle)
    this.addChild(new Graphics().rect(-1, 0, 2, radius - 4).fill(colorTheme.primary))
  }

  public takeResources(value: number) {
    this.resources -= value
    if (this.resources < 0) {
      this.destroy()
    }
  }
}

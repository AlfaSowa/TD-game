import { Graphics } from 'pixi.js'
import { Vector2 } from '../../../../utils'
import { colorTheme } from '../../../constants'
import { Game } from '../../../game'
import { BaseBuild } from '../base'

interface IFarmTile {
  game: Game
  position: Vector2
  gap: number
}

export class FarmTile extends BaseBuild {
  size: number = 0

  private graphics!: Graphics
  private isPlanted: boolean = false
  private plantedAt: number | undefined

  constructor({ game, position: { x, y }, gap }: IFarmTile) {
    super({ game })

    this.size = (this.game.app.canvas.width - 40) / 6

    console.log(Math.floor(y), gap, Math.floor(y) * gap)

    this.position.set(x * this.size + gap * x, Math.floor(y) * this.size + gap * Math.floor(y))
  }

  init() {
    this.graphics = new Graphics().rect(0, 0, this.size, this.size).fill({ color: colorTheme.main })

    this.graphics.eventMode = 'static'
    this.graphics.cursor = 'pointer'
    this.graphics.on('pointerdown', () => {
      this.planted()
    })

    this.addChild(this.graphics)
  }

  private planted() {
    if (!this.isPlanted) {
      this.isPlanted = true
      this.plantedAt = Date.now()

      console.log(new Date(this.plantedAt))

      this.graphics.clear()
      this.graphics.rect(0, 0, this.size, this.size).fill({ color: colorTheme.primary })
    }
  }

  update() {}
}

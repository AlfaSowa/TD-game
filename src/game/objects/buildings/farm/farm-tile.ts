import { Graphics } from 'pixi.js'
import { Vector2 } from '../../../../utils'
import { colorTheme } from '../../../constants'
import { Game } from '../../../game'
import { FarmSystem } from '../../../systems'
import { BaseBuild } from '../base'
import { FarmTileType } from './types'

interface IFarmTile {
  game: Game
  position: Vector2
  gap: number
  data: FarmTileType
}

export class FarmTile extends BaseBuild {
  id: string
  size: number = 0

  graphics!: Graphics
  isPlanted: boolean = false
  isReady: boolean = false
  private plantedAt: number | undefined

  constructor({ game, position: { x, y }, gap, data }: IFarmTile) {
    super({ game })

    this.id = data.id
    this.isPlanted = data.isPlanted
    this.isReady = data.isReady

    this.size = (this.game.app.canvas.width - 40) / 6

    this.position.set(x * this.size + gap * x, Math.floor(y) * this.size + gap * Math.floor(y))
  }

  init() {
    const color = this.isPlanted ? (this.isReady ? 'blue' : colorTheme.odd) : colorTheme.main
    this.graphics = new Graphics().rect(0, 0, this.size, this.size).fill({ color: color })

    this.graphics.eventMode = 'static'
    this.graphics.cursor = 'pointer'

    this.graphics.on('pointerdown', () => {
      if (!this.isPlanted || this.isReady) {
        this.graphics.clear()
        this.graphics.rect(0, 0, this.size, this.size).fill({ color: colorTheme.primary })

        this.game.systems.get(FarmSystem).signals.onFarmTileClick.emit(this.id)
      }
    })

    this.addChild(this.graphics)
  }

  update() {}
}

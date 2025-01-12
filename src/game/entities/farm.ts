import { Assets, Graphics, Sprite } from 'pixi.js'
import FarmImage from '../../assets/images/House_Blue.png'
import { Vector2 } from '../../utils'
import { colorTheme } from '../constants'
import { Game } from '../game'
import { FarmSystem } from '../systems'
import { BaseEntity } from './base'

export class Farm extends BaseEntity {
  gap: number = 2

  async init() {
    const texture = await Assets.load(FarmImage)
    const sprite = new Sprite(texture)

    sprite.position.x = 150

    this.addChild(sprite)
    this.position.set(20, 20)
  }
}

type FarmTileType = {
  id: string
  isPlanted: boolean
  isReady: boolean
}

interface IFarmTile {
  game: Game
  position: Vector2
  gap: number
  data: FarmTileType
}

export class FarmTile extends BaseEntity {
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

    this.size = 50

    this.position.set(x * this.size + gap * x, Math.floor(y) * this.size + gap * Math.floor(y))
  }

  init() {
    const color = this.isPlanted ? (this.isReady ? 'blue' : colorTheme.odd) : colorTheme.main
    this.graphics = new Graphics().rect(0, 0, this.size, this.size).fill({ color: color })

    this.graphics.eventMode = 'static'
    this.graphics.cursor = 'pointer'

    this.graphics.on('pointerup', () => {
      if (!this.isPlanted || this.isReady) {
        this.graphics.clear()
        this.graphics.rect(0, 0, this.size, this.size).fill({ color: colorTheme.primary })

        this.game.systems.get(FarmSystem).signals.onTileClick.emit(this.id)
      }
    })

    this.addChild(this.graphics)
  }

  update() {}
}

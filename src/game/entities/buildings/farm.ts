import { Assets, Graphics, Sprite } from 'pixi.js'
import { Vector2 } from '../../../utils'
import { colorTheme } from '../../constants'
import { Game } from '../../game'
import { BaseEntity } from '../base'

export class Farm extends BaseEntity {
  gap: number = 2

  async init() {
    const texture = await Assets.loadBundle(['default'])
    const sprite = new Sprite(texture.default['House_Blue.png'])

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

        // this.game.systems.get(FarmSystem).signals.onTileClick.emit(this.id)
      }
    })

    this.addChild(this.graphics)
  }

  update() {}
}

// export class FarmSystem implements System {
//   public static SYSTEM_ID = 'farm'

//   game!: Game

//   farm!: Farm

//   tilesIds: string[] = []

//   public signals = {
//     onTileClick: new Signal<(id: string) => void>(),
//     onUpdateFarm: new Signal<() => void>(),
//     onInitFarm: new Signal<() => void>()
//   }

//   constructor() {
//     this.signals.onTileClick.connect((id) => {
//       if (!this.tilesIds.includes(id)) {
//         this.tilesIds.push(id)
//       }

//       this.handleTileClick(this.tilesIds)
//     })

//     this.signals.onInitFarm.connect(() => {
//       this.initFarm()
//     })

//     this.signals.onUpdateFarm.connect(() => {
//       this.updateFarm()
//     })
//   }

//   init() {
//     this.game.mediator.initFarmFx()

//     this.farm = new Farm({ game: this.game })

//     this.game.systems.get(ScreensSystem).addContainer(this.farm, 'possession')

//     this.farm.init()
//   }

//   handleTileClick = debounce((ids) => {
//     this.tilesIds = []
//     this.game.mediator.updateFarmFx(ids)
//   }, 3000)

//   updateFarm() {
//     const data = state.farm.data

//     for (const container of this.farm.children) {
//       if (container instanceof FarmTile) {
//         const child = data.find((elem: any) => elem.id === container.id)

//         if (child) {
//           container.isPlanted = child.isPlanted
//           container.isReady = child.isReady

//           const color = child.isPlanted ? (child.isReady ? 'blue' : colorTheme.odd) : colorTheme.main
//           container.graphics.clear()
//           container.graphics.rect(child.x, child.y, container.size, container.size).fill({ color: color })
//         }
//       }
//     }
//   }

//   initFarm() {
//     const data = state.farm.data

//     for (let i = 0; i < data.length; i++) {
//       const fatmTile = new FarmTile({
//         game: this.game,
//         position: new Vector2(i % 3, i / 3),
//         gap: this.farm.gap,
//         data: data[i]
//       })
//       this.farm.addChild(fatmTile)
//       fatmTile.init()
//     }
//   }

//   // update() {
//   //   this.farm.update()
//   // }
// }

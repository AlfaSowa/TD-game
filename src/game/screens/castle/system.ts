import { Graphics } from 'pixi.js'
import { delayToCallback } from '../../../utils'
import { Game } from '../../game'
import { ResourcesSystem, System } from '../../systems'
import { ScreensSystem } from '../system'

export class CastleScreenSystem implements System {
  public static SYSTEM_ID = 'castle-screen-system'

  game!: Game

  castle!: any

  updateButton: Graphics = new Graphics().rect(0, 0, 100, 50).fill({ color: 'green' })

  private interval: number = 5000
  private elapsed: number = 0

  private getDataByLevel(level: number) {
    console.log('castleLevel', level)
  }

  init() {
    // this.castle = this.game.systems.get(EntitiesRenderSystem).possessionData.find((e: any) => e.type === 'Castle')

    console.log('this.castle>>>>>>', this.castle)

    // this.getDataByLevel(this.castle.level.value)

    this.game.systems.get(ScreensSystem).addContainer(this.updateButton, 'castle')

    this.updateButton.cursor = 'pointer'

    this.updateButton.on('pointerup', () => {
      const res: { value: number; alias: string }[] = []

      // for (const element of Object.keys(this.castle.level.next)) {
      //   if (this.castle.level.next[element]) {
      //     res.push({ alias: element, value: this.castle.level.next[element] })
      //   }
      // }

      this.updateButton.eventMode = 'none'

      // this.game.systems.get(LevelingSystem).requestToUpdateEntity(this.castle.type)
      this.game.systems.get(ResourcesSystem).signals.onUpdateResource.emit(res, 'decrease')
      // this.game.systems.get(EntitiesRenderSystem).removeEntityFromScreen({ type: 'Forest', screen: 'possession' })
    })
  }

  //TODO подумать когда вызывать checkResourcesToPay, возможно не по таймеру а когда обновляются ресурсы
  private checkToUpdate = delayToCallback(this.interval, () => {
    // const result = this.game.systems.get(ResourcesSystem).checkResourcesToPay(this.castle.level.next)
    // if (result) {
    //   this.updateButton.eventMode = 'static'
    // } else {
    //   this.updateButton.eventMode = 'none'
    // }
  })

  update() {
    this.checkToUpdate.run(this.game.app.ticker.deltaMS)
  }
}

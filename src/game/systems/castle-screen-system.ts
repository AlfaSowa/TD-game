import { Graphics } from 'pixi.js'
import { delayToCallback } from '../../utils'
import { Game } from '../game'
import { LevelingSystem } from './leveling-system'
import { ResourcesSystem } from './resources-system'

import { ScreensSystem } from './screens-system'
import { System } from './types'

export class CastleScreenSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: any

  updateButton: Graphics = new Graphics().rect(0, 0, 100, 50).fill({ color: 'green' })

  private interval: number = 5000
  private elapsed: number = 0

  private getDataByLevel(level: number) {
    console.log('castleLevel', level)
  }

  init() {
    this.castle = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'Castle')

    this.getDataByLevel(this.castle.level.value)

    this.game.systems.get(ScreensSystem).addContainer(this.updateButton, 'castle')

    this.updateButton.cursor = 'pointer'

    this.updateButton.on('pointerup', () => {
      const res: { value: number; alias: string }[] = []
      for (const element of Object.keys(this.castle.level.next)) {
        if (this.castle.level.next[element]) {
          res.push({ alias: element, value: this.castle.level.next[element] })
        }
      }

      this.updateButton.eventMode = 'none'
      this.game.systems.get(ResourcesSystem).signals.onUpdateResource.emit(res, 'decrease')
    })
  }

  private checkToUpdate = delayToCallback(this.interval, () => {
    const result = this.game.systems.get(ResourcesSystem).checkResourcesToPay(this.castle.level.next)

    if (result) {
      this.updateButton.eventMode = 'static'
    } else {
      this.updateButton.eventMode = 'none'
    }
  })

  update() {
    this.checkToUpdate.run(this.game.app.ticker.deltaMS)
  }
}

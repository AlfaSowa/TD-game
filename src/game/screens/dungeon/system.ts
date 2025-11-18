import { Signal } from 'typed-signals'
import { CavePoint } from '../../entities'
import { Game } from '../../game'
import { System } from '../../systems'

export class DungeonScreenSystem implements System {
  public static SYSTEM_ID = 'dungeon-map-screen-system'

  game!: Game

  cavePoint: CavePoint | null = null

  public signals = {
    onUpdateCavePoint: new Signal<(cavePoint: CavePoint) => void>()
  }

  constructor() {
    this.signals.onUpdateCavePoint.connect((cavePoint) => {
      this.cavePoint = cavePoint
    })
  }

  update() {}
}

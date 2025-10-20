import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { DungeonMap } from '../dungeon'
import { CavePoint } from '../entities'
import { Game } from '../game'
import { System } from './types'

export class DungeonMapScreenSystem implements System {
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

  initDungeonMap(container: Container) {
    const map = new DungeonMap({ game: this.game })
    container.addChild(map)

    map.init()
  }

  update() {}
}

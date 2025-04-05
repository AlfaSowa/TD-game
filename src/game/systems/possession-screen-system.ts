import { Container, Graphics } from 'pixi.js'
import { Castle, Forest } from '../entities'
import { Game } from '../game'
import { HudSystem } from './hud-system'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class PossessionScreenSystem implements System {
  public static SYSTEM_ID = 'castle'

  view: Container = new Container()

  game!: Game

  castle!: Castle
  forest!: Forest

  init() {
    //TODO переделать на систему ентитис которые инициализируются по id
    this.castle = new Castle({
      game: this.game
    })
    this.castle.init()

    this.view.addChild(this.castle)

    this.view.eventMode = 'static'
    this.view.cursor = 'pointer'

    const r = new Graphics().rect(0, 0, 1000, 1000).fill({ color: 'blue' })
    const g = new Graphics().rect(250, 150, 100, 100).fill({ color: 'green' })

    r.addChild(g)

    this.view.on('pointerup', () => {
      this.game.systems.get(HudSystem).signals.onCreateModal.emit(r)
    })

    this.game.systems.get(ScreensSystem).addContainer(this.view, 'possession')

    this.view.position.set(
      this.view.parent.width / 2 - this.view.width / 2,
      this.view.parent.height / 2 - this.view.height / 2
    )

    this.forest = new Forest({ game: this.game })

    this.game.systems.get(ScreensSystem).addContainer(this.forest, 'possession')

    this.forest.init()
  }

  update() {
    this.castle.update()
    this.forest.update()
  }
}

import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { TAIL_SIZE, colorTheme } from '../../constants'
import { BaseGameObject } from '../baseObject'
import { Lumberman } from '../units'
import { BaseBuild } from './base'
import { Castle } from './castle'

interface ISawmill {
  game: Game
}

export class Sawmill extends BaseBuild {
  private target: BaseGameObject | undefined

  constructor({ game }: ISawmill) {
    super({ game })

    this.game = game

    for (const container of this.game.app.stage.children) {
      // if (container instanceof Forest) {
      //   this.target = container
      // }
      if (container instanceof Castle) {
        this.position.set(container.x + container.width, container.y + container.height)
      }
    }

    if (this.target) {
      const lumberman = new Lumberman()

      lumberman.init(this.target, this)
      this.addChild(lumberman)
    }

    this.addChild(new Graphics().rect(0, 0, TAIL_SIZE, TAIL_SIZE).fill(colorTheme.secondary))
  }

  update() {
    for (const container of this.children) {
      if (container instanceof Lumberman) {
        container.update()
      }
    }
  }
}

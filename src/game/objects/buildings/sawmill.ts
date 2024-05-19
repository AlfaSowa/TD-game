import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { BaseBuild } from './base'
import { colorTheme } from '../../constants'
import { Lumberman } from '../units'

interface ISawmill {
  game: Game
}

export class Sawmill extends BaseBuild {
  resources: number = 0
  maxResources: number = 500

  constructor({ game }: ISawmill) {
    super({ game, radius: 5 })

    this.game = game

    this.position.set(20, 20)

    this.addChild(new Graphics().circle(0, 0, this.radius).fill(colorTheme.main))

    this.addChild(new Lumberman({ game }))
  }

  setResources(value: number) {
    this.resources += value
  }

  update() {
    for (const container of this.children) {
      if (container instanceof Lumberman) {
        container.update()
      }
    }
  }
}

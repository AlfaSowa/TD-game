import { Container, Graphics } from 'pixi.js'
import { Game } from '../..'
import { randomNumber } from '../../utils'
import { state } from '../../core'

interface IBaseEnemy {
  game: Game
  spawnRadius: number
}

export class BaseEnemy extends Container {
  game: Game

  radius: number
  color: string

  velocity: number = randomNumber(state.getSpeedEnemies) / 10

  constructor({ game, spawnRadius }: IBaseEnemy) {
    super()

    const r = Math.random()
    const fixedR = Number(r.toFixed(1))

    this.color = `rgba(73,69,65,${fixedR < 0.2 ? 0.2 : fixedR})`
    this.radius = ((fixedR < 0.2 ? 0.2 : fixedR) * 10) % 5

    this.game = game

    this.x = game.scene.app.canvas.width / 2 + spawnRadius * Math.sin(360 / r)
    this.y = game.scene.app.canvas.height / 2 + spawnRadius * Math.cos(360 / r)

    const shape = new Graphics().circle(0, 0, this.radius).fill(this.color)

    this.addChild(shape)
  }
}

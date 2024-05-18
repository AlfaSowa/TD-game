import { Container, Graphics } from 'pixi.js'
import { Game } from '../..'
import { Weapons, state } from '../../core'
import { colorTheme } from '../../constants'
import { delayToCallback } from '../../utils'

interface IPlayer {
  game: Game
}

export class Player extends Container {
  game: Game
  radius: number = 20

  private isAttack: boolean = true

  private weapons: Weapons

  constructor({ game }: IPlayer) {
    super()

    this.game = game

    this.x = game.scene.app.canvas.width / 2
    this.y = game.scene.app.canvas.height / 2

    const shape = new Graphics().circle(0, 0, this.radius).fill(colorTheme.primary)
    this.addChild(shape)

    this.weapons = new Weapons({ game: this.game })
    this.addChild(this.weapons)

    console.log(this)
  }

  dalayToAttack = delayToCallback(() => {
    this.isAttack = true
  })

  private attackTarget() {
    this.isAttack = false
  }

  update() {
    if (this.weapons) {
      this.weapons.update()
    }

    if (state.getPlayerAttackSpeed > 1) {
      if (this.isAttack) {
        this.attackTarget()
      } else {
        this.dalayToAttack(state.getPlayerAttackSpeed)
      }
    }
  }
}

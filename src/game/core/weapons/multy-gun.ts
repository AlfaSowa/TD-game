import { Graphics } from 'pixi.js'

import { WeaponBase } from './base'
import { Game } from '../..'
import { colorTheme } from '../../constants'

interface IMultyGun {
  game: Game
}

export class MultyGun extends WeaponBase {
  private radius: number = 20
  private distaceToProjectile: number = 150
  private positionOnCircle: number = 0

  constructor({ game }: IMultyGun) {
    super({ game })

    this.position.set(
      this.distaceToProjectile * Math.sin((this.positionOnCircle * Math.PI) / 180),
      this.distaceToProjectile * Math.cos((this.positionOnCircle * Math.PI) / 180)
    )

    const shape = new Graphics().circle(0, 0, this.radius).stroke(colorTheme.primary)

    this.addChild(shape)
  }

  move() {
    this.positionOnCircle += 0.5

    this.position.set(
      this.distaceToProjectile * Math.sin((this.positionOnCircle * Math.PI) / 180),
      this.distaceToProjectile * Math.cos((this.positionOnCircle * Math.PI) / 180)
    )
  }

  update() {
    this.move()
  }
}

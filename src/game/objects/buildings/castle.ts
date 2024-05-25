import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { BaseBuild } from './base'
import { BUY_NEW_BUILDING, TAIL_SIZE, colorTheme } from '../../constants'
import { Sawmill } from './sawmill'
import { BuildingsTypes } from './types'
import { events } from '../../core'
import { CastelWall } from './castle-wall'

const setWalls = (wallSize: number, factor: number) => {
  return [
    [-wallSize * factor, 0],
    [-wallSize * factor, wallSize],
    [-wallSize * factor, -wallSize],
    [wallSize * factor, 0],
    [wallSize * factor, wallSize],
    [wallSize * factor, -wallSize],
    [0, wallSize * factor],
    [wallSize, wallSize * factor],
    [-wallSize, wallSize * factor],
    // [-wallSize / 2, -wallSize / 2 - wallSize * factor],
    [wallSize, -wallSize * factor],
    [-wallSize, -wallSize * factor]
  ]
}

interface ICastle {
  game: Game
}

export class Castle extends BaseBuild {
  radius: number = 10
  walls: number[][] = []

  constructor({ game }: ICastle) {
    super({ game })

    this.position.set(game.scene.app.canvas.width / 2, game.scene.app.canvas.height / 2)

    this.addChild(new Graphics().rect(0, 0, TAIL_SIZE, TAIL_SIZE).fill(colorTheme.primary))

    this.walls = setWalls(TAIL_SIZE, 2)

    for (let i = 0; i < this.walls.length; i++) {
      this.addChild(new CastelWall({ game, x: this.walls[i][0], y: this.walls[i][1] }))
    }

    this.addChild(new Sawmill({ game: this.game }))

    events.on(BUY_NEW_BUILDING, this, (type: BuildingsTypes) => {
      this.addNewBuild(type)
    })
  }

  private addNewBuild(type: BuildingsTypes) {
    if (type === 'Sawmill') {
      for (const container of this.children) {
        if (container instanceof Sawmill) {
          container.generatePath()
        }
      }
    }
  }

  update() {
    for (const container of this.children) {
      if (container instanceof Sawmill) {
        container.update()
      }
    }
  }
}

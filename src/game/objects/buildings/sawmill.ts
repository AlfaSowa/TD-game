import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { BaseBuild } from './base'
import { TAIL_SIZE, colorTheme } from '../../constants'
import { Lumberman } from '../units'
import { Path, Pathfinder } from '../../core'
import { Vector2 } from '../../utils'
import { Castle } from './castle'
import { CastelWall } from './castle-wall'
import { Forest } from '../resources'

interface ISawmill {
  game: Game
}

export class Sawmill extends BaseBuild {
  private currentResources: number = 0
  private maxResources: number = 1000

  private pathfinder: Pathfinder

  pathId!: string
  path!: Path

  constructor({ game }: ISawmill) {
    super({ game })

    this.game = game

    this.position.set(TAIL_SIZE, TAIL_SIZE)

    this.addChild(new Graphics().rect(0, 0, TAIL_SIZE, TAIL_SIZE).fill(colorTheme.primary))

    this.addChild(new Lumberman({ game }))

    setTimeout(() => {
      this.addChild(new Lumberman({ game }))
    }, 3000)

    setTimeout(() => {
      this.addChild(new Lumberman({ game }))
    }, 6000)

    setTimeout(() => {
      this.addChild(new Lumberman({ game }))
    }, 9000)

    this.pathfinder = new Pathfinder({ game })
  }

  generatePath() {
    const walls: { [key: string]: { [key: string]: boolean } } = {}

    for (const container of this.game.scene.app.stage.children) {
      if (container instanceof Castle) {
        if (!walls[Math.floor(container.x / TAIL_SIZE)]) {
          walls[Math.floor(container.x / TAIL_SIZE)] = {}
        }
        walls[Math.floor(container.x / TAIL_SIZE)][Math.floor(container.y / TAIL_SIZE)] = true

        for (let i = 0; i < container?.children.length; i++) {
          if (container?.children[i] instanceof CastelWall) {
            const x = container?.children[i].groupTransform.tx
            const y = container?.children[i].groupTransform.ty

            if (!walls[Math.floor(x / TAIL_SIZE)]) {
              walls[Math.floor(x / TAIL_SIZE)] = {}
            }

            walls[Math.floor(x / TAIL_SIZE)][Math.floor(y / TAIL_SIZE)] = true
          }
        }
      }
    }

    this.pathfinder.init(walls)

    let startPoint = new Vector2(0, 0)
    let endPoint = new Vector2(0, 0)

    for (const container of this.game.scene.app.stage.children) {
      if (container instanceof Forest) {
        endPoint = new Vector2(
          Math.floor(container.groupTransform.tx / TAIL_SIZE),
          Math.floor(container.groupTransform.ty / TAIL_SIZE)
        )
      }
    }

    for (const container of this.parent.children) {
      if (container instanceof Sawmill) {
        startPoint = new Vector2(
          Math.floor(container.groupTransform.tx / TAIL_SIZE),
          Math.floor(container.groupTransform.ty / TAIL_SIZE) - 1
        )
      }
    }

    const { path, pathId } = this.pathfinder.addNewPath(startPoint, endPoint)

    this.pathId = pathId
    this.path = path
  }

  public putResources(value: number) {
    if (this.currentResources + value <= this.maxResources) {
      this.currentResources += value
      return 0
    }
    return value
  }

  update() {
    for (const container of this.children) {
      if (container instanceof Lumberman) {
        container.updatePath(this.path)
      }
    }

    for (const container of this.children) {
      if (container instanceof Lumberman) {
        container.update()
      }
    }
  }
}

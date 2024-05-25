import { Graphics } from 'pixi.js'
import { Game } from '../../game'
import { Forest } from '../resources'
import { BaseUnit } from './base'
import { ForestTile } from '../resources/forest'
import { TAIL_SIZE, colorTheme } from '../../constants'
import { getNearestContainerTarget, isContainersColision, moveElementToContainer } from '../../utils'
import { Sawmill } from '../buildings/sawmill'
import { Path } from '../../core'

interface ILumberman {
  game: Game
}

export class Lumberman extends BaseUnit {
  game: Game
  forest!: Forest

  nextStep: number = 1

  resources: number = 0
  maxResources: number = 10
  isFull: boolean = false

  isReady: boolean = true

  velocity: number = 4

  path: Path | null = null

  isHarvesting: boolean = false
  isStoring: boolean = false

  size: number = 8

  constructor({ game }: ILumberman) {
    super()
    this.game = game
    this.addChild(new Graphics().rect(0, 0, this.size, this.size).fill(colorTheme.odd))
  }

  findingForestResources() {
    for (const container of this.game.scene.app.stage.children) {
      if (container instanceof Forest) {
        const [nearestTarget, distToNearestTarget] = getNearestContainerTarget(this, container.children)

        if (nearestTarget && nearestTarget instanceof ForestTile) {
          const isCollision = isContainersColision(this, nearestTarget, this.size, TAIL_SIZE)

          if (!isCollision) {
            moveElementToContainer(this, nearestTarget, this.velocity)
          } else {
            nearestTarget.takeResources(0.1)
            this.resources += 0.1

            if (this.resources >= this.maxResources) {
              this.isFull = true
              this.isHarvesting = false
            }
          }
        }
      }
    }
  }

  storingResources() {
    const isCollision = isContainersColision(this, this.parent, this.size, 16)

    if (!isCollision) {
      moveElementToContainer(this, this.parent, this.velocity)
    } else {
      this.updateResurces()
    }
  }

  private updateResurces() {
    if (this.parent instanceof Sawmill) {
      this.resources = this.parent.putResources(this.resources)

      if (this.resources === 0) {
        this.isFull = false
        this.isStoring = false
      } else {
        this.isReady = false
      }
    }
  }

  private moveToForestByPath() {
    if (this.path) {
      const point = this.path.path[this.path.path.length - this.nextStep]

      const x = point.x * TAIL_SIZE
      const y = point.y * TAIL_SIZE

      let delta = {
        x: x - this.groupTransform.tx,
        y: y - this.groupTransform.ty
      }

      if (this.groupTransform.tx !== x || this.groupTransform.ty !== y) {
        let angle = Math.atan2(delta.y, delta.x)

        this.x += Math.cos(angle) * this.velocity
        this.y += Math.sin(angle) * this.velocity
      }

      const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))

      if (dist <= TAIL_SIZE) {
        if (this.path.path[this.path.path.length - this.nextStep - 1]) {
          this.nextStep++
        } else {
          this.isHarvesting = true
        }
      }
    }
  }

  private moveToBaseByPath() {
    if (this.path) {
      const point = this.path.path[this.path.path.length - this.nextStep]

      const x = point.x * TAIL_SIZE
      const y = point.y * TAIL_SIZE

      let delta = {
        x: x - this.groupTransform.tx,
        y: y - this.groupTransform.ty
      }

      if (this.groupTransform.tx !== x || this.groupTransform.ty !== y) {
        let angle = Math.atan2(delta.y, delta.x)

        this.x += Math.cos(angle) * this.velocity
        this.y += Math.sin(angle) * this.velocity
      }

      const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))

      if (dist <= TAIL_SIZE) {
        if (this.path.path[this.path.path.length - this.nextStep + 1]) {
          this.nextStep--
        } else {
          this.isStoring = true
        }
      }
    }
  }

  updatePath(path: Path) {
    this.path = path
  }

  update() {
    if (this.isHarvesting) {
      this.findingForestResources()
    }

    if (this.isStoring) {
      this.storingResources()
    }

    if (!this.isHarvesting && !this.isStoring) {
      if (this.path) {
        if (!this.isFull) {
          this.moveToForestByPath()
        } else {
          this.moveToBaseByPath()
        }
      }
    }
  }
}

import { Graphics } from 'pixi.js'
import { Game } from '../../game'
import { Forest } from '../resources'
import { BaseUnit } from './base'
import { ForestTile } from '../resources/forest'
import { colorTheme } from '../../constants'
import { getNearestContainerTarget, isContainersColision, moveElementToContainer } from '../../utils'
import { Sawmill } from '../buildings/sawmill'

interface ILumberman {
  game: Game
}

export class Lumberman extends BaseUnit {
  game: Game
  forest!: Forest

  resources: number = 0
  maxResources: number = 10
  isFull: boolean = false

  isReady: boolean = true

  constructor({ game }: ILumberman) {
    super()
    this.game = game
    this.addChild(new Graphics().circle(0, 0, 2).fill(colorTheme.secondary))
  }

  getResources(target: ForestTile) {
    target.getResources(1)
    this.resources += 1

    if (this.resources >= this.maxResources) {
      this.isFull = true
    }
  }

  moveToForest() {
    for (const container of this.game.scene.app.stage.children) {
      if (container instanceof Forest) {
        const [nearestTarget, distToNearestTarget] = getNearestContainerTarget(this, container.children)

        if (nearestTarget && nearestTarget instanceof ForestTile) {
          const isCollision = isContainersColision(this, nearestTarget, 2, 50 / 3)

          if (!isCollision) {
            moveElementToContainer(this, nearestTarget, 0.1)
          } else {
            this.getResources(nearestTarget)
          }
        }
      }
    }
  }

  moveToBase() {
    moveElementToContainer(this, this.parent, 0.1)

    const isCollision = isContainersColision(this, this.parent, 2, 5)

    if (isCollision && this.parent instanceof Sawmill) {
      if (this.parent.resources + this.resources <= this.parent.maxResources) {
        this.parent.setResources(this.resources)
        this.resources = 0
      }

      if (this.resources === 0) {
        this.isFull = false
      } else {
        this.isReady = false
      }
    }
  }

  idle() {
    if (this.parent instanceof Sawmill) {
      if (this.parent.resources + this.resources <= this.parent.maxResources) {
        this.parent.setResources(this.resources)
        this.isReady = true
      }
    }
  }

  update() {
    if (this.isReady) {
      if (!this.isFull) {
        this.moveToForest()
      } else {
        this.moveToBase()
      }
    } else {
      this.idle()
    }
  }
}

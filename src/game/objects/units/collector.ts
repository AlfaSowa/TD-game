import { Container, Graphics } from 'pixi.js'
import { TAIL_SIZE, colorTheme } from '../../constants'
import { getNearestContainerTarget, isContainersColision, moveElementToContainer } from '../../utils'
import { BaseBuild } from '../buildings/base'
import { BaseResources } from '../resources/base'
import { BaseUnit } from './base'

export class Collector extends BaseUnit {
  private resources: number = 0
  private maxResources: number = 10

  private isFull: boolean = false
  private isReady: boolean = true

  private isCollecting: boolean = false
  private isUnloading: boolean = false

  private target: Container | undefined
  private store: Container | undefined

  private graphics: Graphics

  constructor() {
    super()

    this.position.set(0, 0)
    this.graphics = new Graphics().rect(0, 0, this.size, this.size).fill({ color: colorTheme.odd })
    this.addChild(this.graphics)
  }

  public setTarget(target: Container) {
    this.target = target
  }

  public removeTarget() {
    this.target = undefined
  }

  public setStore(store: Container) {
    this.store = store
  }

  public removeStore() {
    this.store = undefined
  }

  private moveToResources() {
    if (this.target && this.target?.children.length > 0) {
      const delta = {
        x: this.target.x - this.groupTransform.tx,
        y: this.target.y - this.groupTransform.ty
      }

      if (this.groupTransform.tx !== this.target.x || this.groupTransform.ty !== this.target.y) {
        const angle = Math.atan2(delta.y, delta.x)

        this.x += Math.cos(angle) * this.velocity
        this.y += Math.sin(angle) * this.velocity
      }

      const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))

      if (dist <= TAIL_SIZE) {
        this.isCollecting = true
      }
    }
  }

  private findingResources() {
    if (this.target && this.target.children.length > 0) {
      const [nearestTarget] = getNearestContainerTarget(this, this.target.children)

      if (nearestTarget && nearestTarget instanceof BaseResources) {
        const isCollision = isContainersColision(this, nearestTarget, this.size, TAIL_SIZE)

        if (!isCollision) {
          moveElementToContainer(this, nearestTarget, this.velocity)
        } else {
          //TODO переделать
          nearestTarget.takeResources(0.1)
          this.resources += 0.1

          if (this.resources >= this.maxResources) {
            this.isFull = true
            this.isCollecting = false
            this.graphics.clear()
            this.graphics.rect(0, 0, this.size, this.size).fill({ color: 'red' })
          }
        }
      }
    } else {
      this.isFull = true
      this.isCollecting = false
    }
  }

  private moveToStore() {
    if (this.store && this.store instanceof BaseBuild) {
      const delta = {
        x: this.store.x - this.groupTransform.tx,
        y: this.store.y - this.groupTransform.ty
      }

      if (this.groupTransform.tx !== this.store.x || this.groupTransform.ty !== this.store.y) {
        const angle = Math.atan2(delta.y, delta.x)

        this.x += Math.cos(angle) * this.velocity
        this.y += Math.sin(angle) * this.velocity
      }

      const dist = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))

      if (dist <= TAIL_SIZE) {
        this.resources = this.store.putResources(this.resources)

        if (this.resources === 0) {
          this.graphics.clear()
          this.graphics.rect(0, 0, this.size, this.size).fill({ color: colorTheme.odd })
          this.isFull = false
          this.isUnloading = false
        } else {
          this.isReady = false
        }
      }
    }
  }

  storingResources() {
    if (this.store) {
      const isCollision = isContainersColision(this, this.store, this.size, 16)

      if (!isCollision) {
        moveElementToContainer(this, this.store, this.velocity)
      } else {
        this.isUnloading = false
      }
    }
  }

  update() {
    if (this.isCollecting) {
      this.findingResources()
    }

    if (this.isUnloading) {
      this.storingResources()
    }

    if (!this.isCollecting && !this.isUnloading) {
      if (!this.isFull) {
        this.moveToResources()
      } else {
        this.moveToStore()
      }
    }
  }
}

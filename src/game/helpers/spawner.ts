import { Container } from 'pixi.js'
import { isContainersCollision, randomNumber } from '../../utils'

type PlaceType = {
  distance: {
    min: number
    max: number
  }
}

export type SpawnerConfigType<T> = {
  interval?: number
  isInfinity?: boolean
  maxElementsOnView?: number
  isFilling?: boolean
  render: () => Promise<T>
  container: Container
  place?: PlaceType
}

export class Spawner<T extends Container> extends Container {
  private maxElementsOnView: number = 0
  private isInfinity: boolean = true
  private render!: () => Promise<T>
  private interval: number = 1000

  private elapsed: number = 0

  private isFilling: boolean = true

  private childrenCounter: number = 0

  private container!: Container

  private isPause: boolean = false

  private place: PlaceType = {
    distance: {
      min: 300,
      max: 300
    }
  }

  constructor({ render, interval, isInfinity, isFilling, maxElementsOnView, container, place }: SpawnerConfigType<T>) {
    super()

    this.render = render
    this.isInfinity = isInfinity ?? this.isInfinity
    this.interval = interval || this.interval
    this.elapsed = this.interval
    this.isFilling = isFilling ?? this.isFilling
    this.maxElementsOnView = maxElementsOnView || this.maxElementsOnView

    this.place = place || this.place

    this.container = container
  }

  private async infinitySpawn(delta: number) {
    this.elapsed += delta
    if (this.elapsed >= this.interval) {
      this.elapsed = 0
      const element = await this.render()
      this.container.addChild(element)
    }
  }

  private collisionResponse(element: Container, child: Container) {
    // element.x = 500
    // this.isPause = true
  }

  private async spawn(delta: number) {
    if (this.childrenCounter < this.maxElementsOnView) {
      this.elapsed += delta

      if (this.elapsed >= this.interval) {
        this.elapsed = 0
        const r = Math.random()

        const element = await this.render()

        element.x = Math.floor(randomNumber([this.place.distance.min, this.place.distance.max]) * Math.sin(360 / r))
        element.y = Math.floor(randomNumber([this.place.distance.min, this.place.distance.max]) * Math.cos(360 / r))
        // element.visible = false

        this.container.addChild(element)

        for (let i = 0; i < this.container.children.length; i++) {
          if (this.container.children[i].uid === element.uid) {
            for (let j = 0; j < this.container.children.length; j++) {
              if (this.container.children[j].uid !== this.container.children[i].uid) {
                if (isContainersCollision(this.container.children[i], this.container.children[j])) {
                  this.collisionResponse(this.container.children[i], this.container.children[j])
                }
              }
            }
          }
        }

        this.container.children.sort((a, b) => a.x - b.x && a.y - b.y)
        this.childrenCounter += 1
      }
    }
  }

  onRemoveItem() {
    if (this.isFilling) {
      this.childrenCounter -= 1
    }
  }

  update(delta: number) {
    if (!this.isPause) {
      if (this.isInfinity) {
        this.infinitySpawn(delta)
      } else {
        this.spawn(delta)
      }
    }
  }
}

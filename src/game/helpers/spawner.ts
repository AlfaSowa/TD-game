import { Container } from 'pixi.js'

export type SpawnerConfigType<T> = {
  interval?: number
  isInfinity?: boolean
  maxElementsOnView?: number
  isFilling?: boolean
  render: () => T
  container: Container
}

export class Spawner<T extends Container> extends Container {
  private maxElementsOnView: number = 0
  private isInfinity: boolean = true
  private render!: () => T
  private interval: number = 1000

  private elapsed: number = 0

  private isFilling: boolean = true

  private childrenCounter: number = 0

  private container!: Container

  constructor({ render, interval, isInfinity, isFilling, maxElementsOnView, container }: SpawnerConfigType<T>) {
    super()

    this.render = render
    this.isInfinity = isInfinity ?? this.isInfinity
    this.interval = interval || this.interval
    this.elapsed = this.interval
    this.isFilling = isFilling ?? this.isFilling
    this.maxElementsOnView = maxElementsOnView || this.maxElementsOnView

    this.container = container
  }

  private infinitySpawn(delta: number) {
    this.elapsed += delta
    if (this.elapsed >= this.interval) {
      this.elapsed = 0
      const element = this.render()
      this.container.addChild(element)
    }
  }

  private spawn(delta: number) {
    if (this.childrenCounter < this.maxElementsOnView) {
      this.elapsed += delta

      if (this.elapsed >= this.interval) {
        this.elapsed = 0
        const element = this.render()
        this.container.addChild(element)
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
    if (this.isInfinity) {
      this.infinitySpawn(delta)
    } else {
      this.spawn(delta)
    }
  }
}

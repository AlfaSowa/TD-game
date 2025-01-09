import { Container } from 'pixi.js'

export type SpawnerConfigType<T> = {
  interval?: number
  isInfinity?: boolean
  maxElements?: number
  render: () => T
}

interface ContainerWithUpdate extends Container {
  update?: () => void
}

export class Spawner<T extends ContainerWithUpdate> extends Container {
  private maxElements: number = 0
  private isInfinity: boolean = true
  private render!: () => T
  private interval: number = 1000

  private elapsed: number = 0

  children: ContainerWithUpdate[] = []

  constructor({ render, interval, isInfinity, maxElements }: SpawnerConfigType<T>) {
    super()

    this.render = render
    this.isInfinity = isInfinity ?? this.isInfinity
    this.interval = interval || this.interval
    this.elapsed = this.interval
    this.maxElements = maxElements || this.maxElements
  }

  updateChildren() {
    for (const element of this.children) {
      if (element.update) {
        element.update()
      }
    }
  }

  private infinitySpawn(delta: number) {
    this.elapsed += delta
    if (this.elapsed >= this.interval) {
      this.elapsed = 0
      const element = this.render()
      this.addChild<ContainerWithUpdate[]>(element)
    }
  }

  private spawn(delta: number) {
    this.elapsed += delta
    if (this.elapsed >= this.interval) {
      this.elapsed = 0
      const element = this.render()
      this.addChild<ContainerWithUpdate[]>(element)
    }
  }

  update(delta: number) {
    this.updateChildren()

    if (this.isInfinity) {
      this.infinitySpawn(delta)
    } else {
      if (this.children.length < this.maxElements) {
        this.spawn(delta)
      }
    }
  }
}

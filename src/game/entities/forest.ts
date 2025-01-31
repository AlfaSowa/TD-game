import { Container } from 'pixi.js'
import { randomNumber } from '../../utils'
import { Spawner } from '../helpers'
import { ScreensSystem, SpawnersSystem } from '../systems'
import { BaseEntity } from './base'
import { ResourceStump, ResourceTree } from './resources'
import { Resource } from './resources/resource'

const SPAWN_INTERVAL = 1000
const MAX_SPAW_ELEMENTS = 1

export class Forest extends BaseEntity {
  spawner!: Spawner<ResourceTree>
  view: Container = new Container()

  private createTree(): ResourceTree {
    const r = Math.random()
    const woodResource = new ResourceTree({
      game: this.game,
      onClick: (resource) => {
        resource.remove()
      },
      onRemove: (resource) => {
        this.createStump(resource)
      }
    })

    woodResource.clicked()
    woodResource.x = 500 + randomNumber([150, 300]) * Math.sin(360 / r)
    woodResource.y = 500 + randomNumber([150, 300]) * Math.cos(360 / r)
    woodResource.init()

    return woodResource
  }

  private createStump(resource: Resource) {
    const tmp = { x: resource.x, y: resource.y, width: resource.width, height: resource.height }

    const stumpResource = new ResourceStump({
      game: this.game,
      onClick: () => {
        console.log(123123)
      }
    })

    stumpResource.init().then((e) => {
      e.position.set(tmp.x + tmp.width / 2 - e.width / 2 + 0.5, tmp.y + tmp.height - e.height)
    })

    this.view.addChild(stumpResource)
  }

  init() {
    this.spawner = this.game.systems.get(SpawnersSystem).createSpawner<ResourceTree>({
      maxElements: MAX_SPAW_ELEMENTS,
      render: () => {
        return this.createTree()
      },
      interval: SPAWN_INTERVAL,
      isInfinity: false
    })

    this.game.systems.get(ScreensSystem).addContainer(this.spawner, 'possession')
    this.game.systems.get(ScreensSystem).addContainer(this.view, 'possession')

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }
}

import { randomNumber } from '../../utils'
import { Spawner } from '../helpers'
import { ResourcesSystem, ScreensSystem, SpawnersSystem } from '../systems'
import { BaseEntity } from './base'
import { ResourceStump, ResourceTree } from './resources'
import { Resource } from './resources/resource'

const SPAWN_INTERVAL = 300
const MAX_SPAW_ELEMENTS = 10

export class Forest extends BaseEntity {
  spawner!: Spawner<ResourceTree>

  private createTree(): ResourceTree {
    const r = Math.random()
    const resourceTree = new ResourceTree({
      game: this.game,
      onClick: (resource) => {
        resource.remove()
      },
      onRemove: (resource) => {
        this.game.systems.get(ResourcesSystem).signals.onGetResources.emit({ alias: 'wood', value: resource.value })
        this.createStump(resource)
        this.spawner.onRemoveItem()
      },
      value: 5
    })

    resourceTree.clicked()
    resourceTree.x = Math.floor(randomNumber([150, 300]) * Math.sin(360 / r))
    resourceTree.y = Math.floor(randomNumber([150, 300]) * Math.cos(360 / r))

    resourceTree.init()

    return resourceTree
  }

  private createStump(resource: Resource) {
    const tmp = {
      x: resource.x,
      y: resource.y,
      width: resource.width,
      height: resource.height
    }

    const stumpResource = new ResourceStump({
      game: this.game,
      onClick: (res) => {
        console.log('stumpResource click')
      }
    })

    stumpResource.clicked()

    stumpResource.init().then((e) => {
      e.position.set(tmp.x, Math.floor(tmp.y + 38 - e.height / 2))
    })

    this.addChild(stumpResource)
  }

  updateChildren() {
    for (const element of this.children) {
      if (element?.update) {
        element.update()
      }
    }
  }

  init() {
    this.spawner = this.game.systems.get(SpawnersSystem).createSpawner<ResourceTree>({
      container: this,
      maxElementsOnView: MAX_SPAW_ELEMENTS,
      render: () => {
        return this.createTree()
      },
      interval: SPAWN_INTERVAL,
      isInfinity: false,
      isFilling: false
    })

    this.game.systems.get(ScreensSystem).addContainer(this.spawner, 'possession')

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  update() {
    this.updateChildren()
  }
}

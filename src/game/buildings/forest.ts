import { BaseEntity } from '../base'
// import { ResourceStump, ResourceTree } from '../entities'
// import { Resource } from '../entities/resources/resource'

const SPAWN_INTERVAL = 20
const MAX_SPAW_ELEMENTS = 50
export class Forest extends BaseEntity {
  // spawner!: Spawner<ResourceTree>
  // async createTree(): Promise<ResourceTree> {
  //   const resourceTree = new ResourceTree({
  //     game: this.game,
  //     onRemove: (resource) => {
  //       this.game.systems
  //         .get(ResourcesSystem)
  //         .signals.onUpdateResource.emit([{ alias: resource.alias, value: resource.value }], 'increase')
  //       this.createStump(resource)
  //       this.spawner.onRemoveItem()
  //     },
  //     value: 3
  //   })
  //   resourceTree.clicked((resource: ResourceTree) => {
  //     resource.remove()
  //   })
  //   await resourceTree.init()
  //   return resourceTree
  // }
  // private createStump(resource: Resource) {
  //   const tmp = {
  //     x: resource.x,
  //     y: resource.y,
  //     width: resource.width,
  //     height: resource.height
  //   }
  //   const stumpResource = new ResourceStump({
  //     game: this.game,
  //     onRemove: (resource) => {
  //       this.game.systems
  //         .get(ResourcesSystem)
  //         .signals.onUpdateResource.emit([{ alias: resource.alias, value: resource.value }], 'increase')
  //     },
  //     value: 1
  //   })
  //   stumpResource.clicked((resource: ResourceStump) => {
  //     resource.remove()
  //   })
  //   stumpResource.init().then((e) => {
  //     e.position.set(tmp.x, Math.floor(tmp.y + 38 - e.height / 2))
  //   })
  //   this.addChild(stumpResource)
  // }
  // updateChildren() {
  //   for (const element of this.children) {
  //     if (element?.update) {
  //       element.update()
  //     }
  //   }
  // }
  // addSpawnerToStage() {
  //   this.game.systems.get(ScreensSystem).addContainer(this.spawner, 'possession')
  // }
  // update() {
  //   this.updateChildren()
  // }
}

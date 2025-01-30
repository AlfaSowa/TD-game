import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'
import { WORLD_MAP_ACTIVE_H, WORLD_MAP_ACTIVE_W, WORLD_MAP_H, WORLD_MAP_W } from './constans'

export class MapScreen extends Container {
  viewport!: Viewport

  activeContainer: Container = new Container()

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: WORLD_MAP_W,
      worldHeight: WORLD_MAP_H,
      events: app.renderer.events
    })

    this.viewport.on('drag-start', () => {
      this.viewport.interactiveChildren = false
    })
    this.viewport.on('drag-end', () => {
      this.viewport.interactiveChildren = true
    })

    this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)
    this.viewport.drag().clamp({ direction: 'all' })
    this.viewport.addChild(new Graphics().rect(0, 0, WORLD_MAP_W, WORLD_MAP_H).fill({ color: 'rgba(149, 138, 122)' }))

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, WORLD_MAP_ACTIVE_W, WORLD_MAP_ACTIVE_H).fill({ color: 'rgba(197, 187, 164)' })
    )

    this.updateActiveContainerPositio()

    this.viewport.addChild(this.activeContainer)

    this.addChild(this.viewport)
  }

  updateActiveContainerPositio() {
    this.activeContainer.position.set(
      this.viewport.width / 2 - this.activeContainer.width / 2,
      this.viewport.height / 2 - this.activeContainer.height / 2
    )
  }

  addContainer(container: Container, index?: number) {
    if (typeof index === 'number') {
      this.activeContainer.addChildAt(container, index)
    } else {
      this.activeContainer.addChild(container)
    }

    // this.updateActiveContainerPositio()
  }

  update() {}
}

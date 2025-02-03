import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'
import {
  WORLD_POSSESSION_ACTIVE_H,
  WORLD_POSSESSION_ACTIVE_W,
  WORLD_POSSESSION_H,
  WORLD_POSSESSION_W
} from './constans'

export class PossessionScreen extends Container {
  viewport!: Viewport

  activeContainer: Container = new Container()

  public signals = {}

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: WORLD_POSSESSION_W,
      worldHeight: WORLD_POSSESSION_H,
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
    this.viewport.addChild(
      new Graphics().rect(0, 0, WORLD_POSSESSION_W, WORLD_POSSESSION_H).fill({ color: 'rgba(149, 138, 122)' })
    )

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, WORLD_POSSESSION_ACTIVE_W, WORLD_POSSESSION_ACTIVE_H).fill({ color: '#a8ae51' })
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

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
    this.updateActiveContainerPositio()
  }

  update() {}
}

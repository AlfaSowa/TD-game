import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'

import { BaseScreen } from '../base'
import { WORLD_CASTLE_ACTIVE_H, WORLD_CASTLE_ACTIVE_W, WORLD_CASTLE_H, WORLD_CASTLE_W } from '../constans'

export class CastleScreen extends BaseScreen {
  SCREEN_NAME = 'castle-screen'

  activeContainer: Container = new Container()

  public signals = {}

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: WORLD_CASTLE_ACTIVE_W,
      worldHeight: WORLD_CASTLE_ACTIVE_H,
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
      new Graphics().rect(0, 0, WORLD_CASTLE_W, WORLD_CASTLE_H).fill({ color: 'rgba(149, 138, 122)' })
    )

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, WORLD_CASTLE_ACTIVE_W, WORLD_CASTLE_ACTIVE_H).fill({ color: '#a8ae51' })
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
  }

  update() {}
}

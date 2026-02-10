import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'

export const WORLD_MAP_ACTIVE_W = 1000
export const WORLD_MAP_ACTIVE_H = 1000

export const WORLD_MAP_W = WORLD_MAP_ACTIVE_W + 200
export const WORLD_MAP_H = WORLD_MAP_ACTIVE_H + 150

export class Scene {
  id: string

  view: Container = new Container()
  viewport?: Viewport
  activeContainer: Container = new Container()

  constructor(id: string) {
    this.id = id
  }

  init(app: Application, isViewport: boolean = true) {
    if (isViewport) {
      this.viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: WORLD_MAP_W,
        worldHeight: WORLD_MAP_H,
        events: app.renderer.events
      })

      this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)
      this.viewport.drag().clamp({ direction: 'all' })

      this.viewport.addChild(new Graphics().rect(0, 0, WORLD_MAP_W, WORLD_MAP_H).fill({ color: 'rgba(149, 138, 122)' }))
      this.activeContainer.addChild(
        new Graphics().rect(0, 0, WORLD_MAP_ACTIVE_W, WORLD_MAP_ACTIVE_H).fill({ color: '#a8ae51' })
      )

      this.activeContainer.position.set(
        this.viewport.width / 2 - this.activeContainer.width / 2,
        this.viewport.height / 2 - this.activeContainer.height / 2
      )

      this.viewport.addChild(this.activeContainer)

      this.view.addChild(this.viewport)
    }
  }

  update(dt: number) {}
}

import { Application, Container, Graphics } from 'pixi.js'
import { DungeonSystem } from '../../systems'
import { BaseScreen } from '../base'

export class DungeonScreen extends BaseScreen {
  SCREEN_NAME = 'dungeon-map-screen'

  init(app: Application) {
    console.log('dungeon-map-screen init')

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, app.canvas.width, app.canvas.height).fill({ color: '#9F3ED5' })
    )

    this.addChild(this.activeContainer)
  }

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
  }

  onLoad() {
    console.log('DungeonScreen onLoad')
    this.game.systems.get(DungeonSystem).preparingMap(this.activeContainer)
  }

  update() {}
}

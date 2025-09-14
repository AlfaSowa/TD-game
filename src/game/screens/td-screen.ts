import { Application, Container, Graphics } from 'pixi.js'
import { BaseScreen } from '../base'

export class TDScreen extends BaseScreen {
  SCREEN_NAME = 'td'

  public signals = {}

  init(app: Application) {
    this.addChild(new Graphics().rect(0, 0, 430, 932).fill({ color: '#2f4a6a' }))
  }

  addContainer(container: Container) {
    this.addChild(container)
  }

  update() {}
}

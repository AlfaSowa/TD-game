import { Scrollbox } from 'pixi-scrollbox'
import { Viewport } from 'pixi-viewport-new'
import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { HudSystem } from '../systems'

const HEADER_BUTTON_SIZE = 50
const MAIN_W = 350
const HEADER_H = 50
const CONTENT_H = 400
export class Modal extends Container {
  private game: Game

  viewport!: Viewport

  content: Container = new Container()
  header: Container = new Container()
  scrollbox!: Scrollbox

  constructor(game: Game) {
    super()
    this.game = game

    this.addChild(this.header)
    this.addChild(this.content)
    this.initButtomClose()
  }

  initButtomClose() {
    const button = new Graphics()
      .rect(window.innerWidth > 500 ? 500 : 300 - HEADER_BUTTON_SIZE, 0, HEADER_BUTTON_SIZE, HEADER_BUTTON_SIZE)
      .fill({ color: 'red' })

    button.eventMode = 'static'
    button.cursor = 'pointer'

    button.on('pointerup', () => {
      this.removeFromParent()
      this.game.systems.get(HudSystem).signals.onDestroyModal.emit()
    })

    this.header.addChild(button)
  }

  addHeader(content?: Container) {
    if (content) {
      this.header.addChild(content)
    }
  }

  addContent(content: Container) {
    if (content) {
      this.scrollbox = new Scrollbox({
        boxWidth: window.innerWidth > 500 ? 500 : 300,
        boxHeight: 500,
        interaction: this.game.app.renderer.events
      })

      this.scrollbox.eventMode = 'static'
      this.scrollbox.cursor = 'pointer'

      this.scrollbox.on('pointerup', () => {
        console.log(123123)
      })

      // this.scrollbox.position.set(200, 200)
      this.scrollbox.content.addChild(content)

      // this.scrollbox.content.addChild(content)
      this.scrollbox.update()

      this.content.addChild(this.scrollbox)
    }
  }
}

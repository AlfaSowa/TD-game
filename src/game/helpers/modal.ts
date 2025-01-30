import { ScrollBox } from '@pixi/ui'
import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { HudSystem } from '../systems'

const HEADER_BUTTON_SIZE = 50
const MAIN_W = 350
const HEADER_H = 50
const CONTENT_H = 400
export class Modal extends Container {
  private game: Game

  content: Container = new Container()
  header: Container = new Container()
  scrollbox!: ScrollBox

  constructor(game: Game) {
    super()
    this.game = game
  }

  init() {
    // this.scrollbox = new Scrollbox({
    //   boxWidth: ,
    //   boxHeight: CONTENT_H,
    //   // scrollbarBackgroundAlpha: 0,
    //   // scrollbarForegroundAlpha: 0,
    //   stopPropagation: true,
    //   divWheel: this.game.app.canvas
    // })

    this.scrollbox = new ScrollBox({
      background: 0xffffff,
      width: MAIN_W,
      height: CONTENT_H,
      padding: 10,
      bottomPadding: 20,
      items: [
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }),
        new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' })
      ]
    })

    const header = new Graphics().rect(0, 0, MAIN_W, HEADER_H).fill({ color: 'green' })

    this.header.addChild(header)

    this.addChild(this.header)
    // this.addChild(this.content)
    this.addChild(this.scrollbox)
  }

  initButtomClose() {
    const button = new Graphics()
      .rect(MAIN_W - HEADER_BUTTON_SIZE, 0, HEADER_BUTTON_SIZE, HEADER_BUTTON_SIZE)
      .fill({ color: 'blue' })

    button.eventMode = 'static'
    button.cursor = 'pointer'

    button.on('pointerup', () => {
      this.clear()
      this.removeFromParent()
      this.game.systems.get(HudSystem).signals.onDestroyModal.emit()
    })

    this.header.addChild(button)
  }

  addHeader(content?: Container) {
    if (content) {
      this.header.addChild(content)
    }

    this.initButtomClose()
  }

  addContent(content: Container) {
    // this.scrollbox.position.set(0, this.header.height)
    const container = new Container()
    const bluecontainer = new Graphics().rect(200, 200, 100, 100).fill({ color: 'blue' })
    bluecontainer.eventMode = 'static'
    bluecontainer.cursor = 'pointer'
    bluecontainer.on('pointerup', () => {
      console.log('bluecontainer')
    })

    container.addChild(new Graphics().rect(0, 0, 1000, 1000).fill({ color: 'white' }))
    container.addChild(new Graphics().rect(0, 0, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(100, 100, 100, 100).fill({ color: 'green' }))
    container.addChild(bluecontainer)
    container.addChild(new Graphics().rect(300, 300, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(400, 400, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(500, 500, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(600, 600, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(700, 700, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(800, 800, 100, 100).fill({ color: 'green' }))
    container.addChild(new Graphics().rect(900, 900, 100, 100).fill({ color: 'green' }))
    // this.scrollbox.addChild(container)

    console.log(this.scrollbox)
  }

  clear() {
    console.log(1)
    this.scrollbox.removeChildren()
  }
}

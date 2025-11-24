import { Viewport } from 'pixi-viewport-new'
import { Container } from 'pixi.js'
import { Game } from '../game'

interface ScreenConstructor {
  game: Game
}

interface IScreen {
  SCREEN_NAME: string

  viewport: Viewport

  onLoad?: () => void
}

export class BaseScreen extends Container implements IScreen {
  SCREEN_NAME!: string

  game!: Game

  viewport!: Viewport

  activeContainer: Container = new Container()

  isFirstLoaded: boolean = false

  onFirstLoad() {}

  onLoad() {}

  constructor({ game }: ScreenConstructor) {
    super()
    this.game = game
  }
}

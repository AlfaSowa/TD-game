import { Game } from '../game'

export interface System<S extends Game = Game> {
  game?: S

  init?: () => void

  update?: () => void
}

export interface SystemClass<GAME extends Game = Game, SYSTEM extends System<GAME> = System<GAME>> {
  SYSTEM_ID: string

  new (): SYSTEM
}

import { Game } from '../../game'
import { System } from '../../systems'

export class CaveScreenSystem implements System {
  public static SYSTEM_ID = 'cave-screen-system'

  game!: Game

  update() {}
}

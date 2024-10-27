import { Game } from './game'
import { System, SystemClass } from './systems'

export class SystemRunner {
  private readonly _game: Game

  public readonly allSystems: Map<string, System> = new Map()

  constructor(game: Game) {
    this._game = game
  }

  public add<S extends System>(Class: SystemClass<Game, S>): S {
    console.log(123, this._game)

    const name = Class.SYSTEM_ID

    if (!name) throw new Error('[SystemManager]: cannot add System without name')

    if (this.allSystems.has(name)) {
      return this.allSystems.get(name) as S
    }

    const system = new Class()
    system.game = this._game

    // Add the system to the SystemRunner's allSystems map
    this.allSystems.set(Class.SYSTEM_ID, system)

    // Return the new instance of the system
    return system
  }

  public get<S extends System>(Class: SystemClass<Game, S>): S {
    return this.allSystems.get(Class.SYSTEM_ID) as S
  }

  public init() {
    this.allSystems.forEach((system) => system.init?.())
  }

  public update() {
    this.allSystems.forEach((system) => system.update?.())
  }
}

import { Container } from 'pixi.js'
import { Game } from '../game'
import { Spawner, SpawnerConfigType } from '../helpers'
import { System } from './types'

export class SpawnersSystem implements System {
  public static SYSTEM_ID = 'spawner'
  game!: Game

  private spawners: Spawner<any>[] = []

  createSpawner<T extends Container>(config: SpawnerConfigType<T>): Spawner<T> {
    const spawner = new Spawner<T>(config)
    this.spawners.push(spawner)

    return spawner
  }

  update() {
    for (const spawner of this.spawners) {
      spawner.update(this.game.app.ticker.deltaMS)
    }
  }
}

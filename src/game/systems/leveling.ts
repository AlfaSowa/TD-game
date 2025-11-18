import { Game } from '../game'
import { System } from './types'

export class LevelingSystem implements System {
  public static SYSTEM_ID = 'leveling'
  game!: Game

  requestToUpdateEntity(entityType: string) {
    new Promise((resolve) => {
      console.log(`запрос на обновление ${entityType}`)

      setTimeout(() => {
        resolve(console.log(`запрос на обновление ${entityType} выполнен`))
      }, 1000)
    })
  }
}

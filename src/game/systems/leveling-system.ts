import { Game } from '../game'
import { System } from './types'

type ConfigType = {
  name: string
  levels: {
    [key: number]: {
      level: number
      resources_required: { wood: number; stone: number }
      abilities: string[]
      image: string
    }
  }
}

export class LevelingSystem implements System {
  public static SYSTEM_ID = 'leveling'
  game!: Game
  private data!: any

  init() {
    this.fetchLevelingData()
  }

  private fetchLevelingData() {
    const config = {
      buildings: [
        {
          name: 'Castle',
          level: 0,
          abilities: ['Basic Attack', 'Shield'],
          image: 'Castle_Blue.png',
          resourcesRequired: { wood: 100, stone: 50 }
        },
        {
          name: 'City',
          level: 1,
          abilities: ['Basic Attack'],
          image: 'House_Red.png',
          resourcesRequired: { wood: 100, stone: 50 }
        }
      ]
    }

    this.data = config
  }

  getSystemData(type: string, entity: string) {
    console.log(this.data)
    return this.data[type]?.find((e: any) => e.name === entity)
  }
}

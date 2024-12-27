import { getAllCoreResources } from '../../api/resources'
import { Game } from '../game'
import { System } from './types'

type CoreResource = {
  quantityPerSecond: number
  id: string
  name: string
}

export class ResourcesSystem implements System {
  public static SYSTEM_ID = 'resources'
  game!: Game

  resources: CoreResource[] = []

  private async getAllResources() {
    await getAllCoreResources().then((data) => {
      this.resources = data
    })
  }

  init() {
    this.getAllResources()
    console.log('ResourcesSystem', this.resources)
  }
}

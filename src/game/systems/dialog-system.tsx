import { Game } from '../game'
import { System } from './types'

export class DialogSystem implements System {
  public static SYSTEM_ID = 'dialog'
  game!: Game
  private currentMessage: string | null = null
  private dialog: string[] = []

  getDialog(id: string) {
    this.dialog = []
    return []
  }

  getCurrentMessage() {
    return this.currentMessage
  }

  nextMessage() {
    console.log('nextMessage')
  }

  prevMessage() {
    console.log('prevMessage')
  }
}

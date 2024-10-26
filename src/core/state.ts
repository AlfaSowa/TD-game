import { CastleGrid } from '../game/objects/buildings/types'

class State {
  private playerAttackRadius: number = 50
  private playerAttackSpeed: number = 300
  private playerLevel: number = 1

  private totalExperience: number = 100 * this.playerLevel
  private currentExperience: number = 0

  private score: number = 0

  private amountOfEnemies: number[] = [2, 6]
  private delayToSpawnEnemies: number[] = [60, 90]
  private speedEnemies: number[] = [0, 3]

  private castleGrid: CastleGrid[] = [
    { id: 0, purchased: true, price: 300, available: false },
    { id: 1, purchased: false, price: 250, available: true },
    { id: 2, purchased: true, price: 30, available: true },
    { id: 3, purchased: true, price: 2040, available: false },
    { id: 4, purchased: true, price: 130, available: true },
    { id: 5, purchased: true, price: 560, available: false },
    { id: 6, purchased: true, price: 40, available: false },
    { id: 7, purchased: true, price: 2640, available: false },
    { id: 8, purchased: true, price: 200, available: false }
  ]

  // private weapons: any = WEAPONS.filter((weapon) => weapon.active)

  constructor() {
    // events.on('DAMAGE_HERO', this, (value) => {
    //   console.log('DAMAGE_HERO')
    //   this.playerAttackSpeed = this.playerAttackSpeed - 20 <= 0 ? 1 : this.playerAttackSpeed - 20
    //   this.playerAttackRadius += 1
    // })
  }

  set upPlayerExperience(current: number) {
    this.playerLevel = this.playerLevel + 1
    this.totalExperience = 100 * this.playerLevel
    this.currentExperience = current
  }

  set decreasePlayerExperience(value: number) {
    this.score -= value
    window.dispatchEvent(new CustomEvent('update-score', { detail: { score: this.score, level: this.playerLevel } }))
    this.currentExperience = this.currentExperience - value <= 0 ? 0 : this.currentExperience - value
  }

  set increasePlayerExperience(value: number) {
    this.score += value
    window.dispatchEvent(new CustomEvent('update-score', { detail: { score: this.score, level: this.playerLevel } }))
    this.currentExperience += value

    if (this.currentExperience >= this.totalExperience) {
      this.upPlayerExperience = 0
    }
  }

  set updateCastleGrid(grid: CastleGrid[]) {
    this.castleGrid = grid
  }

  get getExperience() {
    return {
      total: this.totalExperience,
      current: this.currentExperience
    }
  }

  get getCastleGrid() {
    return this.castleGrid
  }

  get getSpeedEnemies() {
    return this.speedEnemies
  }

  get getPlayerAttackSpeed() {
    return this.playerAttackSpeed
  }

  get getAmountOfEnemies() {
    return this.amountOfEnemies
  }

  get getDelayToSpawnEnemies() {
    return this.delayToSpawnEnemies
  }

  get getPlayerAttackRadius() {
    return this.playerAttackRadius
  }
}

export const state = new State()

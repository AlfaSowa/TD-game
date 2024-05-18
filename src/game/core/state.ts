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

  get getExperience() {
    return {
      total: this.totalExperience,
      current: this.currentExperience
    }
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

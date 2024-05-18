import { Container } from 'pixi.js'
import { Game } from '..'
import { BaseEnemy, Player } from '../units'
import { delayToCallback, isTargetsColision, moveElementToTarget, randomNumber } from '../utils'
import { state } from './state'

interface ISpawner {
  game: Game
  player: Player
}

export class Spawner extends Container {
  game: Game
  player: Player
  private elements: BaseEnemy[] = []

  private delaySpawn: number = randomNumber(state.getDelayToSpawnEnemies)

  constructor({ game, player }: ISpawner) {
    super()

    this.game = game
    this.player = player

    console.log(this.game.scene.app)
  }

  private spawnEnemies = delayToCallback(() => {
    for (let i = 0; i < randomNumber(state.getAmountOfEnemies); i++) {
      this.addChild(new BaseEnemy({ game: this.game, spawnRadius: 400 }))
    }
  })

  private isCollsiionWithTarget() {
    for (let i = 0; i < this.children.length; i++) {
      moveElementToTarget(this.children[i], this.player, (this.children[i] as BaseEnemy).velocity)

      const isCollision = isTargetsColision(
        {
          position: { x: this.children[i].x, y: this.children[i].y },
          radius: (this.children[i] as BaseEnemy).radius as number
        },
        this.player
      )

      if (isCollision) {
        this.removeChild(this.children[i])
      }
    }
  }

  update() {
    this.spawnEnemies(this.delaySpawn)
    this.isCollsiionWithTarget()
  }
}

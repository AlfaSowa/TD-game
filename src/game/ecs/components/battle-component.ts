import { Component } from '../../../engine/ecs/components'

export enum BattlePhase {
  INIT,
  GAME_START,
  END
}

export class BattleComponent implements Component {
  phase: BattlePhase = BattlePhase.INIT
}

import { Component } from '../../../engine/ecs/components'

export enum BATTLE_PHASE {
  INIT,
  GAME_START,
  END
}

export class BattleComponent implements Component {
  phase: BATTLE_PHASE = BATTLE_PHASE.INIT
}

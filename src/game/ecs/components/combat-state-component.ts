import { Component } from '../../../engine/ecs/components'

export enum COMBAT_STATE {
  INIT,
  PREPARING,
  SELECTED,
  RESOLVING,
  END_TURN
}

export class CombatStateComponent implements Component {
  phase: COMBAT_STATE = COMBAT_STATE.INIT
}

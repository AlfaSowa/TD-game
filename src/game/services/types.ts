import { Game } from '../game'

interface GameService {
  game: Game
  update: () => void
}

export interface ICastleService extends GameService {}

export interface ISawmillService extends GameService {}

export interface IForestService extends GameService {}

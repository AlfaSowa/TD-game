import { createContext } from 'react'
import { Game } from '../game'
import { Separator } from './widgets'

const game = new Game()

export const GameContext = createContext(game)

export const App = () => {
  return (
    <GameContext.Provider value={game}>
      <Separator />
    </GameContext.Provider>
  )
}

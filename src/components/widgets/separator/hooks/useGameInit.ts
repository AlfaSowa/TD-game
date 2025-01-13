import { useEffect, useState } from 'react'
import { Game } from '../../../../game'

export const useGameInit = (game: Game, user: any) => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)

  useEffect(() => {
    if (!game.isStarted && user) {
      game.init()
    }

    game.signals.onGameStarted.connect((isStarted) => {
      setIsGameStarted(isStarted)
    })
  }, [user])

  return { isGameStarted }
}

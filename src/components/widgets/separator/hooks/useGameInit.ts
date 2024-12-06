import { useEffect, useState } from 'react'
import { Game } from '../../../../game'

export const useGameInit = (game: Game) => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)

  useEffect(() => {
    if (!game.isStarted) {
      game.init()
    }

    game.signals.onGameStarted.connect((isStarted) => {
      setIsGameStarted(isStarted)
    })
  }, [])

  return { isGameStarted }
}

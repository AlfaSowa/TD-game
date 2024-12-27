import { useContext } from 'react'
import { GameContext } from '../../../App'
import { Layout } from '../../../entities'
import { LoadingScreen } from '../../../entities/loading-screen'
import { useGameInit, useGetTelegramUser } from '../hooks'

const tg = (window as any)?.Telegram?.WebApp

export const Separator = () => {
  const game = useContext(GameContext)
  const { tgUser } = useGetTelegramUser(tg)
  const { isGameStarted } = useGameInit(game, tgUser)

  console.log('tgUser', tgUser)
  console.log('isGameStarted', isGameStarted)

  return (
    <div>
      {!tgUser && !isGameStarted && <LoadingScreen />}

      {tgUser && isGameStarted && <Layout />}

      <div id="game-canvas" className="h-dvh w-screen flex items-center justify-center fixed top-0 left-0 -z-10" />
    </div>
  )
}

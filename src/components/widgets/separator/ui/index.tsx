import { useContext } from 'react'
import { GameContext } from '../../../App'
import { Layout } from '../../../entities'
import { LoadingScreen } from '../../../entities/loading-screen'
import { BottomMenu } from '../../bottom-menu'
import { useGameInit, useGetTelegramUser } from '../hooks'

const tg = (window as any)?.Telegram?.WebApp

export const Separator = () => {
  const game = useContext(GameContext)
  const { tgUser } = useGetTelegramUser(tg)
  const { isGameStarted } = useGameInit(game, tgUser)

  console.log('tgUser', tgUser)

  return (
    <div className="flex flex-col h-dvh w-screen">
      {!tgUser && !isGameStarted && <LoadingScreen />}

      {tgUser && isGameStarted && <Layout />}

      <div id="canvas-wrapper" className="flex-1" />

      {tgUser && isGameStarted && <BottomMenu />}
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../../App'
import { Layout } from '../../../entities'
import { LoadingScreen } from '../../../entities/loading-screen'
import { useGameInit, useGetTelegramUser } from '../hooks'

type loadingStateType = 'tg' | 'user' | 'game'
const loadingMessages: Record<loadingStateType, string> = {
  tg: 'Загрузка... Telegram API',
  user: 'Загрузка... Пользователя',
  game: 'Загрузка... Игры'
}

export const Separator = () => {
  const [loadingState, setLoadingState] = useState<loadingStateType>('tg')
  const [tg, setTg] = useState(null)
  const game = useContext(GameContext)
  const { tgUser } = useGetTelegramUser(tg)
  const { isGameStarted } = useGameInit(game, tgUser)

  console.log('tgUser', tgUser)
  console.log('tg', tg)

  useEffect(() => {
    if (tgUser) {
      setLoadingState('game')
    }
  }, [tgUser])

  // useEffect(() => {
  //   const loadTgFx = (event: any) => {
  //     if (event.detail) {
  //       setLoadingState('user')
  //       setTg(event.detail)
  //     }
  //   }
  //   window.addEventListener('loadTg', loadTgFx)

  //   return () => {
  //     window.removeEventListener('loadTg', loadTgFx)
  //   }
  // }, [])

  if (!tgUser || !isGameStarted) {
    return <LoadingScreen message={loadingMessages[loadingState]} />
  }

  return (
    <div className="flex flex-col h-dvh w-screen">
      <Layout />
    </div>
  )
}

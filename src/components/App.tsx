import { useEffect, useState } from 'react'
import { authUser } from '../api'
import { state } from '../core'
import { setCookie } from '../utils'
import { Layout } from './entities'

const tg = (window as any).Telegram.WebApp

const data = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_USER_DATA : tg.initData

export const App = () => {
  const [tgUser, setTgUsesr] = useState<any>(null)
  setCookie('innerData', data, 365)

  console.log(tg)

  useEffect(() => {
    if (!tgUser && data) {
      authUser().then((user) => {
        if (user) {
          state.updateInnerUserData = data
          state.updateUserCoins = user?.coins
          setTgUsesr(user)
        }
      })
    }
  }, [])

  if (!tgUser) {
    return (
      <div className="w-svw h-svh flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  return <Layout />
}

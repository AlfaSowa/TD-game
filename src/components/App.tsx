import { useEffect, useState } from 'react'
import { authUser } from '../api'
import { state } from '../core'
import { setCookie } from '../utils'
import { Layout } from './entities'

const tg = (window as any).Telegram.WebApp

const data = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_USER_DATA : tg.initData

export const App = () => {
  setCookie('innerData', data, 365)

  const [tgUser, setTgUsesr] = useState<any>()

  console.log(tg)

  useEffect(() => {
    if (!tgUser && data) {
      authUser().then((user) => {
        console.log('user', user)
        state.updateInnerUserData = data
        setTgUsesr(user)
      })
    }
  }, [])

  if (!tg) {
    return <div>123123</div>
  }

  return <Layout />
}

import { useEffect, useState } from 'react'
import { state } from '../../../../core'
import { setCookie } from '../../../../utils'
import { authUser } from '../api'

export const useGetTelegramUser = (tg: any) => {
  const data = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_USER_DATA : tg.initData

  const [tgUser, setTgUsesr] = useState<any>(null)
  setCookie('innerData', data, 365)

  console.log(tg)

  useEffect(() => {
    if (tg) {
      tg.disableVerticalSwipes()
    }
  }, [])

  useEffect(() => {
    if (!tgUser && data) {
      authUser().then((user) => {
        if (user) {
          state.updateInnerUserData = data
          state.updateUserGold = user?.gold
          setTgUsesr(user)
        }
      })
    }
  }, [])

  return { tgUser }
}

import { useState } from 'react'

import { setCookie } from '../../../../utils'

export const useGetTelegramUser = (tg: any) => {
  const data = import.meta.env.MODE === 'development' ? import.meta.env.VITE_APP_USER_DATA : tg?.initData

  const [tgUser, setTgUsesr] = useState<any>(null)
  setCookie('innerData', data, 365)

  // useEffect(() => {
  //   if (tg) {
  //     tg?.WebApp.disableVerticalSwipes()
  //   }
  // }, [tg])

  // useEffect(() => {
  //   if (!tgUser && data) {
  //     authUser().then((user) => {
  //       if (user) {
  //         setTgUsesr(user)
  //       }
  //     })
  //   }
  // }, [])

  return { tgUser }
}

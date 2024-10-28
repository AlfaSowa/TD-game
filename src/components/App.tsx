import { useEffect, useState } from 'react'
import { authUser } from '../api'
import { state } from '../core'
import { setCookie } from '../utils'
import { Layout } from './entities'

const tg = (window as any).Telegram.WebApp

const initDevelopData =
  'user=%7B%22id%22%3A209031846%2C%22first_name%22%3A%22Alex%22%2C%22last_name%22%3A%22SOWA%22%2C%22username%22%3A%22alfa_sowa%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5073044584243213687&chat_type=sender&auth_date=1730100547&hash=b0feece23e1ce31a19fa7a71d8b32f2a2bfcf7111e0a322ee6fa904de8cc1af0'
const data = process.env.NODE_ENV === 'development' ? initDevelopData : tg.initData

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

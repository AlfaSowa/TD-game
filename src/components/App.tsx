import { useEffect, useState } from 'react'
import { authUser } from '../api'
import { state } from '../core'
import { Layout } from './entities'

const tg = (window as any).Telegram.WebApp

const initDevelopData =
  'user=%7B%22id%22%3A209031846%2C%22first_name%22%3A%22Alex%22%2C%22last_name%22%3A%22SOWA%22%2C%22username%22%3A%22alfa_sowa%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5073044584243213687&chat_type=sender&auth_date=1729523931&hash=7f9e5146d7e9b5b2eccd0327ef3a3dd48467fddd295d59ee5f661eee85fcfae8'

export const App = () => {
  const [tgUser, setTgUsesr] = useState<any>()

  console.log(tg)

  useEffect(() => {
    const data = process.env.NODE_ENV === 'development' ? initDevelopData : tg.initData

    if (!tgUser && data) {
      authUser(data).then((user) => {
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

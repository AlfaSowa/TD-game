import axios from 'axios'
import { useEffect, useState } from 'react'
import { Layout } from './entities'

const tg = (window as any).Telegram.WebApp

export const App = () => {
  const [tgUser, setTgUsesr] = useState()

  useEffect(() => {
    if (!tgUser && tg.initData) {
      console.log(123)

      axios({
        method: 'post',
        url: 'https://js-game-pack-backend-production.up.railway.app/auth/register',
        data: {
          initData: tg.initData
        }
      })
        .then((response) => {
          console.log(response.data)

          setTgUsesr(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  if (!tg) {
    return <div>123123</div>
  }

  return <Layout />
}

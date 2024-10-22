import { useEffect, useState } from 'react'
import { Game } from '../../game'
import { OPEN_VILLAGE_MENU } from '../../game/constants'
import { events } from '../../game/core'
import { MainMenu, Resurces, Village } from '../hud'

const g = new Game()

export const Layout = () => {
  const [game, setGame] = useState<Game>()
  const [isShowVillage, setIsShowVillage] = useState<boolean>(false)
  // const [isShowCastleGrid, setIsShowCastleGrid] = useState<boolean>(false)

  useEffect(() => {
    const eventID = events.on(OPEN_VILLAGE_MENU, this, (isShow: boolean) => {
      console.log('OPEN_VILLAGE_MENU')

      setTimeout(() => {
        setIsShowVillage(isShow)
      }, 100)
    })

    return () => {
      events.remove(eventID)
    }
  }, [])

  return (
    <>
      {!game && <MainMenu game={g} setGame={setGame} />}

      <div
        id="game-canvas"
        className="h-dvh w-screen flex items-center justify-center bg-[var(--bg)] fixed top-0 left-0 -z-10"
      />

      {game && (
        <img
          src="https://i.pinimg.com/originals/62/b3/c9/62b3c9a0a6038ae920c04a200b499a23.jpg"
          className="object-cover opacity-30 absolute top-0 left-0 pointer-events-none"
        />
      )}

      {/* {isShowCastleGrid && <CastleGrid onClose={setIsShowCastleGrid} />} */}

      {isShowVillage && <Village onClose={() => setIsShowVillage(false)} />}

      {game && <Resurces />}
    </>
  )
}

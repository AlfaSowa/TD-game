import { useEffect, useState } from 'react'
import { Game } from '../game'
import { OPEN_CASTLE_MENU } from '../game/constants'
import { events } from '../game/core'
import { CastleGrid, MainMenu } from './hud'

const g = new Game()

export const App = () => {
  const [game, setGame] = useState<Game>()
  const [isShowCastleGrid, setIsShowCastleGrid] = useState<boolean>(false)

  useEffect(() => {
    events.on(OPEN_CASTLE_MENU, this, (isShow: boolean) => {
      console.log('OPEN_CASTLE_MENU')
      setIsShowCastleGrid(isShow)
    })

    return () => {
      events.unsubscribe(OPEN_CASTLE_MENU)
    }
  }, [])

  return (
    <>
      {!game && <MainMenu game={g} setGame={setGame} />}

      <div
        id="game-canvas"
        className="h-dvh w-screen flex items-center justify-center bg-[var(--bg)] fixed top-0 left-0 -z-10"
      />

      <button onClick={() => setIsShowCastleGrid(false)}>CLOSE</button>

      {isShowCastleGrid && <CastleGrid />}
    </>
  )
}

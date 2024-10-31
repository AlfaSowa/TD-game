import { useEffect, useState } from 'react'
import { Game } from '../../game'

import { state } from '../../core'
import { MainMenu } from '../hud'

const g = new Game()

export const Layout = () => {
  const [game, setGame] = useState<Game>()
  const [coins, setCoins] = useState<number>(0)

  useEffect(() => {
    if (game) {
      game.signals.onCoinsUpdate.connect((value) => {
        setCoins(value)
      })
    }
  }, [game])

  return (
    <>
      {!game && <MainMenu game={g} setGame={setGame} />}

      {game && (
        <div className="absolute top-0 left-0 w-full bg-slate-400 p-2">
          <div className="text-3xl">{coins || state.getUserCoins} coins</div>
        </div>
      )}

      <div
        id="game-canvas"
        className="h-dvh w-screen flex items-center justify-center bg-[var(--bg)] fixed top-0 left-0 -z-10"
      />

      {/* {game && (
        <img
          src="https://i.pinimg.com/originals/62/b3/c9/62b3c9a0a6038ae920c04a200b499a23.jpg"
          className="object-cover opacity-30 absolute top-0 left-0 pointer-events-none"
        />
      )} */}

      {/* {isShowCastleGrid && <CastleGrid onClose={setIsShowCastleGrid} />} */}

      {/* {isShowVillage && <Village onClose={() => setIsShowVillage(false)} />} */}

      {/* {game && <Resurces />} */}
    </>
  )
}

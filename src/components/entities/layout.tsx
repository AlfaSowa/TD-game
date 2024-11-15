import { useEffect, useState } from 'react'
import { Game } from '../../game'

import { state } from '../../core'
import { ScreensSystem } from '../../game/systems'

const g = new Game()

export const Layout = () => {
  const [coins, setCoins] = useState<number>(0)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)

  const openMap = () => {
    g.systems.get(ScreensSystem).signals.onToggleScreen.emit('map')
  }
  const openPossession = () => {
    g.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
  }

  const openTD = () => {
    g.systems.get(ScreensSystem).signals.onToggleScreen.emit('td')
  }

  useEffect(() => {
    if (!g.isStarted) {
      g.init()
    }

    g.signals.onCoinsUpdate.connect((value) => {
      setCoins(value)
    })
    g.signals.onGameStarted.connect((isStarted) => {
      setIsGameStarted(isStarted)
    })
  }, [])

  return (
    <>
      {/* {!game && <MainMenu game={g} setGame={setGame} />} */}

      {!isGameStarted && (
        <div className="w-svw h-svh flex items-center justify-center">
          <div>Загрузка игры...</div>
        </div>
      )}

      {isGameStarted && (
        <div className="absolute top-0 left-0 w-full bg-slate-400 p-2">
          <div className="text-3xl">{coins || state.getUserCoins} coins</div>
        </div>
      )}

      <div id="game-canvas" className="h-dvh w-screen flex items-center justify-center fixed top-0 left-0 -z-10" />

      {isGameStarted && (
        <div className="absolute bottom-0 left-0 w-full bg-slate-400 p-2 flex justify-between">
          <button onClick={openMap}>показать карту</button>
          <button onClick={openPossession}>показать замок</button>
          <button onClick={openTD}>показать темные земли</button>
        </div>
      )}

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

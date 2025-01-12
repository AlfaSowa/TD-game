import { useContext, useEffect, useState } from 'react'
import { state } from '../../game/helpers'
import { ScreensSystem } from '../../game/systems'
import { HomeIcon, MapIcon } from '../../shared/ui'
import { GameContext } from '../App'

export const Layout = () => {
  const game = useContext(GameContext)
  const [gold, setGold] = useState<number>(0)

  const openMap = () => {
    game.systems.get(ScreensSystem).signals.onToggleScreen.emit('map')
  }
  const openPossession = () => {
    game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
  }

  const openTD = () => {
    game.systems.get(ScreensSystem).signals.onToggleScreen.emit('td')
  }

  useEffect(() => {
    game.signals.onGoldUpdate.connect((value) => {
      setGold(value)
    })
  }, [])

  return (
    <>
      <div className="absolute top-0 left-0 w-full bg-slate-400 p-2">
        <div className="text-3xl">{gold || state.getUserGold} золото</div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-slate-400 p-2 flex justify-between">
        <button onClick={openMap} className="text-2xl size-14">
          <MapIcon />
        </button>

        <button onClick={openPossession} className="text-2xl size-14">
          <HomeIcon />
        </button>

        {/* <button onClick={openTD} className="text-2xl size-14">
          <PublicOffIcon />
        </button> */}
      </div>

      {/* {isShowCastleGrid && <CastleGrid onClose={setIsShowCastleGrid} />} */}

      {/* {isShowVillage && <Village onClose={() => setIsShowVillage(false)} />} */}

      {/* {game && <Resurces />} */}
    </>
  )
}

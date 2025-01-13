import { useContext, useEffect, useState } from 'react'
import { state } from '../../game/helpers'
import { GameContext } from '../App'
import { BottomMenu } from '../widgets'

export const Layout = () => {
  const game = useContext(GameContext)
  const [gold, setGold] = useState<number>(0)

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

      <BottomMenu />

      {/* {isShowCastleGrid && <CastleGrid onClose={setIsShowCastleGrid} />} */}

      {/* {isShowVillage && <Village onClose={() => setIsShowVillage(false)} />} */}

      {/* {game && <Resurces />} */}
    </>
  )
}

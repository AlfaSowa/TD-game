import { useContext, useEffect, useState } from 'react'
import { CoreResource } from '../../api'
import { ResourcesSystem } from '../../game/systems'
import { GameContext } from '../App'
import { BottomMenu } from '../widgets'

export const Layout = () => {
  const game = useContext(GameContext)
  const [resources, setResources] = useState<CoreResource[]>([])

  useEffect(() => {
    game.systems.get(ResourcesSystem).getAllResources()
    game.systems.get(ResourcesSystem).signals.setResources.connect((resources) => {
      setResources(resources)
    })
  }, [])

  console.log('resources', resources)

  return (
    <>
      <div className="absolute top-0 left-0 w-full bg-slate-400 p-2 flex gap-4">
        {resources.map((e) => (
          <div className="flex gap-1 items-center" key={e.id}>
            <div>{e.name}</div>
            <div>{e.value}</div>
          </div>
        ))}
      </div>

      <BottomMenu />

      {/* {isShowCastleGrid && <CastleGrid onClose={setIsShowCastleGrid} />} */}

      {/* {isShowVillage && <Village onClose={() => setIsShowVillage(false)} />} */}

      {/* {game && <Resurces />} */}
    </>
  )
}

import { ReactElement, useContext } from 'react'
import { ScreensSystem } from '../../../../game/systems'
import { HomeIcon, MapIcon } from '../../../../shared/ui'
import { GameContext } from '../../../App'

type ButtonType = {
  onClick: () => void
  icon: ReactElement
  title: string
}

export const BottomMenu = () => {
  const game = useContext(GameContext)

  const openMap = () => {
    game.systems.get(ScreensSystem).signals.onToggleScreen.emit('map')
  }

  const openPossession = () => {
    game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
  }

  const buttons: ButtonType[] = [
    {
      icon: <MapIcon />,
      onClick: openMap,
      title: 'map'
    },
    {
      icon: <HomeIcon />,
      onClick: openPossession,
      title: 'castle'
    }
  ]

  return (
    <div className="absolute bottom-0 left-0 w-full bg-slate-400 flex gap-4 items-center px-2 py-1">
      <div className="flex gap-2">
        {buttons.map(({ onClick, icon, title }) => (
          <div key={title}>
            <div className="text-2xl text-center leading-3 mb-1 text-[var(--secondary)]">{title}</div>

            <button
              onClick={onClick}
              className="size-14 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded p-3"
              type="button"
            >
              {icon}
            </button>
          </div>
        ))}
      </div>

      {/* <div className="bg-gray-600 ml-auto p-2">
        <div className="bg-gray-400  px-2 mb-1">qweqweqweqwe qweqweqw: 23 </div>

        <div className="flex gap-2 justify-between">
          <div className="flex flex-1 justify-center h-6 bg-gray-400">1</div>
          <div className="flex flex-1 justify-center h-6 bg-gray-400">2</div>
          <div className="flex flex-1 justify-center h-6 bg-gray-400">3</div>
        </div>
      </div> */}
    </div>
  )
}

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
      title: 'карта'
    },
    {
      icon: <HomeIcon />,
      onClick: openPossession,
      title: 'владения'
    }
  ]

  return (
    <div className="w-full bg-slate-400 flex gap-4 items-center px-2 py-1">
      <div className="grid grid-cols-4 gap-4">
        {buttons.map(({ onClick, icon, title }) => (
          <div key={title} className="flex flex-col items-center">
            <button
              onClick={onClick}
              className="size-12 border-2 border-[var(--secondary)] text-[var(--secondary)] rounded p-2"
              type="button"
            >
              {icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

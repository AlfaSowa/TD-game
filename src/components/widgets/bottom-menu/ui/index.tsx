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
    <div className="absolute bottom-0 left-0 w-full bg-slate-400 flex gap-4 items-center px-2 py-1">
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(({ onClick, icon, title }) => (
          <div key={title} className="flex flex-col items-center">
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
    </div>
  )
}

import { useCallback, useState } from 'react'
import { Game } from '../game'
import { MainMenu } from './hud'
import { Button } from './ui'
import { events } from '../game/core'
import { BuildingsTypes } from '../game/objects/buildings/types'
import { BUY_NEW_BUILDING } from '../game/constants'

const g = new Game()

export const App = () => {
  const [game, setGame] = useState<Game>()

  const buyNewBuilding = useCallback((type: BuildingsTypes) => {
    events.emit(BUY_NEW_BUILDING, type)
  }, [])

  return (
    <>
      {!game && <MainMenu game={g} setGame={setGame} />}

      <div
        id="game-canvas"
        className="h-dvh w-screen flex items-center justify-center bg-[var(--bg)] fixed top-0 left-0 -z-10"
      />

      {game && (
        <div className="absolute bottom-0 w-full h-16 flex items-center justify-center gap-2 px-2">
          <Button onClick={() => buyNewBuilding('Sawmill')} badge={1}>
            Sawmill
          </Button>

          <Button onClick={() => buyNewBuilding('CastelWall')}>CastelWall</Button>
        </div>
      )}
    </>
  )
}

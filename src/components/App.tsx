import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { Game } from '../game'
import { AbilitiesComponent, BonusesComponent, GameComponent, WeaponsComponent } from './hud'

export const ScoreContext = createContext(0)

const g = new Game()

export const App = () => {
  const gameTmp = useRef()
  const [game, setGame] = useState<Game>()
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [isBonuses, setIsBonuses] = useState<boolean>(false)
  const [isWeapons, setIsWeapons] = useState<boolean>(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const starGame = useCallback(() => {
    // gameTmp.current = game
    g.play()
    setGame(g)
  }, [])

  const stopGame = useCallback(() => {
    if (game) {
      // game.stop()
    }
  }, [game])

  const pauseGame = useCallback(() => {
    if (game) {
      // game.pause(true)
    }
  }, [game])

  const unPauseGame = useCallback(() => {
    if (game) {
      // game.pause(false)
      setIsPaused(false)
    }
  }, [game])

  const handleAbilities = useCallback(
    (id: string) => {
      if (game) {
        // game.pause(false)
        setIsPaused(false)
        // game.start()
      }
    },
    [game]
  )

  useEffect(() => {
    window.addEventListener('game-pause', () => {
      setIsPaused(true)
    })

    window.addEventListener('update-score', (e: any) => {
      setScore(e.detail.score)
      setLevel(e.detail.level)
    })
  }, [])

  return (
    <ScoreContext.Provider value={score}>
      {!game && (
        <GameComponent
          starGame={starGame}
          stopGame={stopGame}
          pauseGame={pauseGame}
          unPauseGame={unPauseGame}
          bonuses={() => setIsBonuses(true)}
          weapons={() => setIsWeapons(true)}
        />
      )}

      <div
        id="game-canvas"
        className="h-screen w-screen flex items-center justify-center bg-[var(--bg)]"
        ref={canvasRef}
      />

      {isPaused && <AbilitiesComponent handleAbilities={handleAbilities} />}

      {isBonuses && <BonusesComponent onClose={() => setIsBonuses(false)} />}
      {isWeapons && <WeaponsComponent onClose={() => setIsWeapons(false)} />}

      {game && !isPaused && (
        <div className="absolute bottom-0 w-full h-24 flex items-center justify-center gap-8">
          <div className="text-3xl">{score}</div>
          <div className="text-3xl">{level}</div>
        </div>
      )}

      {game && (
        <div className="absolute top-0  z-40 flex gap-2 text-gray-100 text-xl">
          <button onClick={() => setIsBonuses(true)} className=" bg-slate-700 p-2">
            бонусы
          </button>

          <button onClick={() => setIsWeapons(true)} className=" bg-slate-700 p-2">
            оружие
          </button>
        </div>
      )}
    </ScoreContext.Provider>
  )
}

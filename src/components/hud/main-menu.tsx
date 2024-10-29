import { useCallback } from 'react'
import { Game } from '../../game'
import { Button } from '../ui'

type MainMenuProps = {
  game: Game
  setGame: (game: Game) => void
}

export const MainMenu = ({ game, setGame }: MainMenuProps) => {
  const starGame = useCallback(() => {
    game.init()
    setGame(game)
  }, [game, setGame])

  return (
    <div className="h-dvh flex flex-col p-4 bg-[var(--bg)]">
      <div className="border-dotted flex-1 flex flex-col gap-6 border-4 border-[var(--primary)] p-4 [border-image:linear-gradient(var(--primary),transparent_20%,transparent_80%,var(--primary)_100%)_1]">
        <div className="flex-1 flex items-center justify-center">
          <div>
            <h3 className="text-[var(--primary)] text-center">
              воу воу воу МЫ НАЧИНАЕМ!!! Заходи в игру крась квадратики и собирай с покрашеных квадратов coins каждые 3
              часа! Если не [сообщение удалено] конечно
            </h3>

            <h4 className="text-[var(--primary)] text-center">
              А и запросы обрабатываются медленно так как мы нищие(пока что) и сервисы используем бесплатные
            </h4>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center">
          <Button onClick={starGame} className="text-[3rem] bg-[--primary] text-[var(--bg)]">
            START
          </Button>
        </div>
      </div>
    </div>
  )
}

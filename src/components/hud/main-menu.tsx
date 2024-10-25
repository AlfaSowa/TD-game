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
        {/* <img className="max-h-80 object-scale-down" src={Logo} alt="" /> */}

        <div className="flex-1 flex items-center">
          {/* <h1 className="text-center text-[var(--primary)]">CHAPTER 1</h1> */}
          <h3 className="text-[var(--primary)] text-center">
            В ожиданийи чего-то грандиозного попробуй вырастить больше всех кукурузы
          </h3>
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

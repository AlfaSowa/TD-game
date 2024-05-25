import { useCallback } from 'react'
import { Button } from '../ui'
import { Game } from '../../game'

type MainMenuProps = {
  game: Game
  setGame: (game: Game) => void
}

export const MainMenu = ({ game, setGame }: MainMenuProps) => {
  const starGame = useCallback(() => {
    game.play()
    setGame(game)
  }, [game, setGame])

  return (
    <div className="h-dvh flex flex-col p-4 bg-[var(--bg)]">
      <div className="border-dotted flex-1 flex flex-col gap-6 border-4 border-[var(--primary)] p-4 [border-image:linear-gradient(var(--primary),transparent_20%,transparent_80%,var(--primary)_100%)_1]">
        {/* <img className="max-h-80 object-scale-down" src={Logo} alt="" /> */}

        <div>
          <h1 className="text-center text-[var(--primary)]">CHAPTER 1</h1>
          <p className="text-[var(--primary)]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, iste id. Dolorum, saepe fugiat?
            Praesentium voluptate ullam officia suscipit natus quas nihil beatae, nesciunt facere sit numquam corrupti
            quia molestias?
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center mt-auto">
          <Button onClick={starGame} className="text-[3rem] bg-[--primary] text-[var(--bg)]">
            START
          </Button>
        </div>
      </div>
    </div>
  )
}

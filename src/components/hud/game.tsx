import { Button } from '../ui'

type GameComponentProps = {
  starGame: () => void
  stopGame: () => void
  pauseGame: () => void
  unPauseGame: () => void
  bonuses: () => void
  weapons: () => void
}

const BUTTONS = [
  {
    id: 1,
    name: 'бонусы',
    action: 'bonuses',
    badge: {
      show: true,
      value: 5
    }
  },
  {
    id: 2,
    name: 'оружие',
    action: 'weapons',
    badge: {
      show: true,
      value: 0
    }
  }
]

type ActionsType = 'stop' | 'pause' | 'unpause'

export const GameComponent = ({ starGame, stopGame, pauseGame, unPauseGame, bonuses, weapons }: GameComponentProps) => {
  const actions = {
    stop: stopGame,
    pause: pauseGame,
    unpause: unPauseGame,
    bonuses: bonuses,
    weapons: weapons
  }

  return (
    <div className="flex flex-col inset-0 fixed p-4">
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

          {BUTTONS.map((button) => (
            <Button key={button.id} onClick={actions[button.action as ActionsType]} badge={button.badge}>
              {button.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

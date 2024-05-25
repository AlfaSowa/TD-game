import { useState } from 'react'
import { Modal } from '../entities'

import { WEAPONS } from '../../mock-data'
import { Button } from '../ui'

export const WeaponsComponent = ({ onClose }: { onClose: () => void }) => {
  const [tabId, setTabId] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(WEAPONS[tabId].active)

  const handleClick = (id: number) => {
    setTabId(id)
    setIsActive(WEAPONS[id].active)
  }

  return (
    <Modal onClose={onClose} title="оружие">
      <div className="grid gap-2 grid-cols-4 sticky top-0 bg-slate-900">
        {WEAPONS.map((i) => (
          <div key={i.id} onClick={() => handleClick(i.id)} className="bg-red-400">
            <div className="pb-[100%]">
              <img
                src="https://i.pinimg.com/564x/b7/3c/bf/b73cbf56e904de68d0a1d460e8979d6d.jpg"
                className="absolute"
                alt="1"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-slate-50 p-4 flex-1">{WEAPONS[tabId].description}</div>

      <div className="sticky bottom-0 flex flex-col gap-2">
        <div className="border-2 rounded border-[var(--second)] text-4xl w-full flex items-center justify-center relative py-2">
          123
        </div>

        <Button {...(isActive && { badge: 1 })}>{isActive ? 'улучшить' : 'активировать'}</Button>
      </div>
    </Modal>
  )
}

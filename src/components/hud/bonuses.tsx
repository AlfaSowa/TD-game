import { BONUSES } from '../../mock-data'
import { Modal } from '../entities'

export const BonusesComponent = ({ onClose }: { onClose: () => void }) => {
  const handleClick = (name: string) => {
    console.log(name)
  }
  return (
    <Modal onClose={onClose} title="бонусы">
      <div className="flex gap-2 px-2">
        {BONUSES.map((i, idx) => (
          <div key={idx} className="flex-[9999_0] flex flex-col items-center">
            <BonusesButton onClick={handleClick} name={i.name} />

            {i.children.length > 0 && <BonusesItem onClick={handleClick} items={i.children} />}
          </div>
        ))}
      </div>
    </Modal>
  )
}

const BonusesItem = ({ items, onClick }: { items: any[]; onClick: (name: string) => void }) => {
  return (
    <div className="flex gap-2 mt-2">
      {items.map((i, idx) => (
        <div key={idx} className="flex-[9999_0] flex flex-col items-center">
          <BonusesButton onClick={onClick} name={i.name} />

          {i.children.length > 0 && <BonusesItem onClick={onClick} items={i.children} />}
        </div>
      ))}
    </div>
  )
}

const BonusesButton = ({ name, onClick }: { name: string; onClick: (name: string) => void }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className="text-center border-blue-700 bg-slate-100 border-2 w-12 h-12 overflow-hidden"
    />
  )
}

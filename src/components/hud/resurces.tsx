import { IconBonus } from '../shared'

export const Resurces = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full flex gap-2 px-2 py-1 bg-slate-200">
      <div className="flex gap-1 items-center">
        <div className="w-4 h-4">
          <IconBonus />
        </div>
        <span>(+5)</span>
        <div>Дерево</div>
      </div>

      <div className="flex gap-1 items-center">
        <div className="w-4 h-4">
          <IconBonus />
        </div>
        <span>(+19)</span>
        <div>Золото</div>
      </div>

      <div className="flex gap-1 items-center">
        <div className="w-4 h-4">
          <IconBonus />
        </div>
        <span>(+52)</span>
        <div>Камень</div>
      </div>
    </div>
  )
}

interface VillageProps {
  onClose: (value: boolean) => void
}

const villageObjects = [
  {
    name: 'Дом'
  },
  {
    name: 'Лесопилка'
  },
  {
    name: 'Сарай'
  },
  {
    name: 'Кузня'
  }
]

const fieldsObjects = [
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  },
  {
    name: 'поле'
  }
]

export const Village = ({ onClose }: VillageProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-[calc(100%-32px)] p-2 bg-black/40 z-20">
      <div className="bg-slate-400 h-full flex flex-col">
        <div className="px-2 py-2">
          <button onClick={() => onClose(false)}>выход</button>
        </div>

        <div className="flex-1 relative flex flex-col">
          <img
            src="https://i.pinimg.com/originals/4b/6e/f9/4b6ef9efaa54f5d66ec5f67df0967dc4.jpg"
            className="object-cover opacity-30 absolute top-0 left-0 pointer-events-none"
          />

          <div className="grid grid-cols-2 h-64 border-dashed border-2 border-black m-1 p-1">
            {villageObjects.map((obj) => (
              <div className="bg-slate-500" onClick={() => console.log(obj.name)}>
                {obj.name}
              </div>
            ))}
          </div>

          <div className="h-32 flex">
            <div className="flex-1 border-dashed border-2 border-black m-1 p-1">что-то</div>
            <div className="flex-1 border-dashed border-2 border-black m-1 p-1">что-то</div>
          </div>

          <div className="flex-1 border-dashed border-2 border-black m-1 p-1 grid grid-cols-6 grid-flow-row auto-rows-max gap-1">
            {fieldsObjects.map((obj) => (
              <div className="relative bg-slate-500 pt-[100%]" onClick={() => console.log(obj.name)}>
                <div className="absolute top-0 left-0">{obj.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

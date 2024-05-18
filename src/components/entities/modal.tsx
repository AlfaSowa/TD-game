import { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  title: string
}

export const Modal = ({ children, onClose, title }: ModalProps) => {
  return (
    <div className="absolute inset-0 p-2 z-50">
      <div className="bg-[var(--second)] h-full flex flex-col">
        <div className="flex items-center  pl-4 pr-2 text-[var(--main)]">
          <h1 className="text-4xl">{title}</h1>

          <button onClick={onClose} className="ml-auto ">
            <svg className="w-12 h-12 p-2" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
        </div>

        <div className="bg-[#9b9489] flex-1 overflow-y-auto p-2 relative flex flex-col">{children}</div>
      </div>
    </div>
  )
}

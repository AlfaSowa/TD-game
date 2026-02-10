interface LoadingScreenProps {
  message?: string
}
export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <div className="w-svw h-svh flex items-center justify-center flex-col">
      <div className="text-5xl">ПОЧТИ ГЕРОЙ</div>
      {!message && <div>Загрузка...</div>}
      {message && <div>{message}</div>}
    </div>
  )
}

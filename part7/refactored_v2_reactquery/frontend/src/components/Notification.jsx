import { useNotValue } from '../contexts/NotificationContext'

const Notification = () => {

  const notification = useNotValue()

  if (!notification) return null
  let notifyClass = `notification ${notification.type}`
  return (
    <div>
      <p className={notifyClass}>{notification.message}</p>
    </div>
  )
}

export default Notification
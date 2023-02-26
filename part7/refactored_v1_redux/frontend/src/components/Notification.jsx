import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) return null
  let notifyClass = `notification ${notification.type}`
  return (
    <div>
      <p className={notifyClass}>{notification.message}</p>
    </div>
  )
}

export default Notification
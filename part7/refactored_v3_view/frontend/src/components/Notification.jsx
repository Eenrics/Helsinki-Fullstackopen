import { useSelector } from 'react-redux'
import { Notify } from '../App'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (!notification) return null
  let notifyClass = `notification ${notification.type}`
  return (
    <div>
      <Notify className={notifyClass}>{notification.message}</Notify>
    </div>
  )
}

export default Notification
import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notificaiton = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notificaiton) return null

  return (
    <div style={style}>
      {notificaiton}
    </div>
  )
}

export default Notification

const Notification = ({message}) => {
    return message ?  <h2 className="success">{message}</h2> : null
}
 
export default Notification;
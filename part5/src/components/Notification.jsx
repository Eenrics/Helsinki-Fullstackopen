const Notification = ({notify}) => {
    if (!notify.message) return null
    let notifyClass = `notification ${notify.type}` 
    return ( 
        <div>
        <p className={notifyClass}>{notify.message}</p>
      </div>
     );
}
 
export default Notification;
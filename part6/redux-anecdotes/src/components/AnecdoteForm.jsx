import { useDispatch } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        let content = event.target.quote.value
        if (!content) return
        dispatch(createQuote(content))
        event.target.quote.value = ''
        dispatch(createNotification(`you created '${content}'`))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
      }

    return ( 
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name='quote'/></div>
            <button>create</button>
            </form>
        </>
     );
}
 
export default AnecdoteForm;
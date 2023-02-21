import { useDispatch } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = async (event) => {
        event.preventDefault()
        let content = event.target.quote.value
        if (!content) return
        let response = await anecdoteServices.createNew(content)
        console.log(response)
        dispatch(createQuote(response))
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
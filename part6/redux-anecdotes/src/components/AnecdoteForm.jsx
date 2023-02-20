import { useDispatch } from "react-redux";
import { createQuote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        let content = event.target.quote.value
        if (!content) return
        dispatch(createQuote(content))
        event.target.quote.value = ''
      }

    return ( 
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
            <div><input name='quote'/></div>
            <button type='submit'>create</button>
            </form>
        </>
     );
}
 
export default AnecdoteForm;
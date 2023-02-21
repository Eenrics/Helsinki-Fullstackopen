import { useSelector, useDispatch } from 'react-redux'
import { voteQuote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => filter.test(anecdote.content))
    })

    const vote =  async (anecdote) => {
        dispatch(voteQuote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
      }

    return ( 
      <>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
      </>
     );
}
 
export default AnecdoteList;
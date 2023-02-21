import { useSelector, useDispatch } from 'react-redux'
import { voteForQuote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => filter.test(anecdote.content))
    })

    const vote = ({id, content}) => {
        dispatch(voteForQuote(id))
        dispatch(createNotification(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
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
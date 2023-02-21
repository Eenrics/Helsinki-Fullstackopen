import { useSelector, useDispatch } from 'react-redux'
import { voteForQuote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdotes'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote => filter.test(anecdote.content))
    })

    const vote =  async ({id, content, votes}) => {
        await anecdoteServices.updateQuote({id, content, votes: votes + 1})
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
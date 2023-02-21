import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, updateQuote } from './requests'
import { useNotificationDispatch, clearNotification, setNotification} from './NotificationContext'

const App = () => {

  const dispatch = useNotificationDispatch()

  const setNot = (message, sec) => {
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(clearNotification())
    }, sec*1000)
}

  const queryClient = useQueryClient()
  let response = useQuery('anecdotes', getAll, {refetchOnWindowFocus: false, retry: 1})

  let updateAnecdoteMutate = useMutation(updateQuote, {
    onSuccess: (updatedQuote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id !== updatedQuote.id ? anecdote : updatedQuote))
      setNot(`anecdote '${updatedQuote.content}' voted`, 5)
    },
    onError: (error) => {
      setNot(error.response.data.error, 5)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutate.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if (response.isLoading) return <div>Content is loading</div>
  if (response.isError) return <div>Anecdote sevice not available due to problem in server</div>

  const anecdotes = response.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

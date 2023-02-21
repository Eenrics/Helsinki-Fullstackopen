import { createQuote } from "../requests"
import { useMutation, useQueryClient } from "react-query"
import { useNotificationDispatch, clearNotification, setNotification} from '../NotificationContext'

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()

  const setNot = (message, sec) => {
    dispatch(setNotification(message))
    setTimeout(() => {
        dispatch(clearNotification())
    }, sec*1000)
}

  const queryClient = useQueryClient()

  let newAnecdoteMutate = useMutation(createQuote, {
    onSuccess: (newQuote) => {
      let anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newQuote))
      setNot(`you created anecdote '${newQuote.content}'`, 5)
    },
    onError: (error) => {
      setNot(error.response.data.error, 5)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content) return
    newAnecdoteMutate.mutate({content, votes: 0})
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

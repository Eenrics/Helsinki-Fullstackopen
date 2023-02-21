import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteServices from './services/anecdotes'
import { useEffect } from 'react'
import { setQuote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdotes from './services/anecdotes'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll().then(
      anecdotes => dispatch(setQuote(anecdotes))
    )
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
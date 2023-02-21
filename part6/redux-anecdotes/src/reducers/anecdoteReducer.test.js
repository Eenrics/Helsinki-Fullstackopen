import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
    const initialAnecdotes = [
        "programmig with JavaScript is fun",
        "redux toolkit is easy"
    ]

    const getId = () => (100000 * Math.random()).toFixed(0)
    const asObject = (anecdote) => {
        return {
          content: anecdote,
          id: getId(),
          votes: 0
        }
      }

    const initialState = initialAnecdotes.map(asObject)

    test("initial votes are returned with undefined state", () => {
        
        const action = {
            type: 'anecdotes/do_nothing',
            payload: 4
        }
        const newState = anecdoteReducer(undefined, action)
        expect(newState).toHaveLength(6)
    })

    test("anecdotes state is not changed with wrong action", () => {
        
        const action = {
            type: 'anecdotes/do_nothing',
            payload: 'do_nothing'
        }
        const state = initialState

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(initialState[0])
        expect(newState).toContainEqual(initialState[1])
    })

    test("votes can be changed with right action", () => {
        
        const action = {
            type: 'anecdotes/voteForQuote',
            payload: {...initialState[0], votes: initialState[0].votes + 1}
        }
        const state = initialState

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(initialState[1])
        expect(newState).toContainEqual({
            content: 'programmig with JavaScript is fun',
            id: initialState[0].id,
            votes: 1
        })
    })

    test("anecdote can be added with right action", () => {

        const payload = {content: 'I love learning at helsinki', votes: 0, id: 213}
        
        const action = {
            type: 'anecdotes/appendQuote',
            payload
        }
        const state = initialState

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState).toHaveLength(3)

        const anecdotes = newState.map(anecdote => anecdote.content)
        expect(anecdotes).toContain('I love learning at helsinki')
    })
      
})
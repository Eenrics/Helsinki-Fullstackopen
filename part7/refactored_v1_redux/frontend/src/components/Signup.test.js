import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Signup from './Signup'


describe('<Signup />', () => {
  let handleMockHandler = jest.fn()
  let inputMockHandler = jest.fn()

  const signUser = {
    name: 'Jest Here',
    username: 'jesthere',
    passowrd: 'jest1234',
    confpassword: 'jest1234'
  }

  beforeEach(() => {
    render(<Signup
      handleSignup={handleMockHandler}
      setSignup={inputMockHandler} signup={signUser}/>)
  })

  test('Signup form is submitted with the right content', () => {
    const user = userEvent

    const userInput = screen.getAllByRole('textbox')

    const signUp = screen.getByText('Sign up')

    user.type(userInput[0], 'Jest Here')

    expect(inputMockHandler.mock.calls).toHaveLength(9)

    user.click(signUp)
    expect(handleMockHandler.mock.calls).toHaveLength(1)

  })
})
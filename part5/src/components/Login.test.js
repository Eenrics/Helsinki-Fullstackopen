import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Login from './Login'


describe('<Login />', () => {
  let loginMockHandler = jest.fn()
  let nameMockHandler = jest.fn()
  let passMockHandler = jest.fn()

  beforeEach(() => {
    render(<Login
      handleLogin={loginMockHandler}
      handlePassword={passMockHandler}
      handleUsername={nameMockHandler}  />)
  })

  test('Login form is submitted with the right content', () => {
    const user = userEvent

    const username = screen.getByPlaceholderText('username')
    const password = screen.getByPlaceholderText('password')

    const login = screen.getByText('Log in')

    user.type(username, 'Jest')
    user.type(password, '1234')

    user.click(login)

    expect(loginMockHandler.mock.calls).toHaveLength(1)
    expect(nameMockHandler.mock.calls).toHaveLength(4)
    expect(passMockHandler.mock.calls).toHaveLength(4)
  })
})
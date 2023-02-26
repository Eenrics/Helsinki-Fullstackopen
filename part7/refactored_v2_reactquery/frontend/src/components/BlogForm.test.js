import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogForm from './BlogForm'

describe('<BlogFom />', () => {
  let mockHandler = jest.fn()

  beforeEach(() => {
    render(<BlogForm handleBlog={mockHandler} />)
  })

  test('Blog form is submitted with the right content', () => {
    const user = userEvent

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    const submit = screen.getByText('create')

    user.type(title, 'this is mock title')
    user.type(author, 'jest and r-t-l')
    user.type(url, 'facebook.com')

    user.click(submit)

    expect(mockHandler.mock.calls).toHaveLength(1)

    const response = mockHandler.mock.calls[0][0]

    expect(response.title).toBe('this is mock title')
    expect(response.author).toBe('jest and r-t-l')
    expect(response.url).toBe('facebook.com')
  })
})
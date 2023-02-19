import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'test with jest and react-testing-library',
      author: 'who knows',
      url: 'nourl',
      likes: 4
    }
    render(<Blog blog={blog} />)

  })

  test('blog title and author is rendered', () => {

    let element = screen.getByText('test with jest and react-testing-library who knows')
    expect(element).toBeDefined()
  })

  test('blog url and like is not rendered at first', () => {

    let url = screen.queryByText('nourl')
    let likes = screen.queryByText('4')

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('blog url and like is rendered when show button clicked', async () => {

    const user = userEvent
    const button = screen.getByText('view')

    user.click(button)

    let url = screen.queryByText('nourl')
    let likes = screen.queryByText('4')

    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
  })
})

describe('<Blog /> <Button /> like', () => {
  test('like button raise the correct action', async () => {

    const user = userEvent
    const mockHandler = jest.fn()

    const blog = {
      title: 'test with jest and react-testing-library',
      author: 'who knows',
      url: 'nourl',
      likes: 4
    }

    const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

    const button = screen.getByText('view')
    user.click(button)

    const likeButton = container.querySelector('.like')
    user.click(likeButton)
    user.click(likeButton)


    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
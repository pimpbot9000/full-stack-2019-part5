import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Post from './Post'
import { prettyDOM } from '@testing-library/dom'

/**
 * Togglability of <Post> is mostly covered by Togglableheader tests
 */
describe('<Post />', () => {

  let component
  let mockHandler
  const title = 'title'
  const author = 'author'
  const post = {
    title, author,
    user: {
      username: 'username'
    }
  }

  const user = {
    username: 'username'
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Post post={post} onLike={mockHandler} onDelete={mockHandler} user={user}/>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      `${title} by ${author}`
    )
  })

  test('clicking the like button twice fires the callback twice', () => {

    const button = component.getByText('Like!')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)

  })

  test('delete button exists', () => {
    component.getByText('delete me')
  })

  test('clicking the delete button fires the callback', () => {

    const button = component.getByText('delete me')
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(1)

  })
})
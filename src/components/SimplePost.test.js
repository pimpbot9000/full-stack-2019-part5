import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimplePost from './SimplePost'
import { prettyDOM } from '@testing-library/dom'

test('renders content', () => {
  const title = 'Component testing is done with react-testing-library'
  const author = 'Dijkstra'
  const post = {
    title, author
  }

  const component = render(
    <SimplePost post={post} />
  )

  expect(component.container).toHaveTextContent(
    `${title} by ${author}`
  )


})

test('clicking the button fires the onLike once', () => {

  const title = 'Component testing is done with react-testing-library'
  const author = 'Dijkstra'
  const post = {
    title, author
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimplePost post={post} onLike={mockHandler} />
  )

  const button = getByText('like')

  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})
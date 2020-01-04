import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Post from './Post'
import { prettyDOM } from '@testing-library/dom'


test('renders content', () => {
  const title = 'Component testing is done with react-testing-library'
  const author = 'Dijkstra'
  const post = {
    title, author
  }

  const component = render(
    <Post post={post} />
  )

  const p = component.container.querySelector('p')

  console.log(prettyDOM(p))

  expect(component.container).toHaveTextContent(
    `${title} by ${author}`
  )
})

test('clicking the like button fires once the callback', () => {

  const title = 'title'
  const author = 'author'
  const post = {
    title, author
  }

  const mockHandler = jest.fn()

  const component = render(
    <Post post={post} onLike={mockHandler} />
  )

  const header = component.getByText(`${title} by ${author}`)
  const button = component.getByText('Like!')

  fireEvent.click(header)  //click header to open
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})
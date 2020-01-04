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

test('clicking the header opens shit up', () => {

  const title = 'Component testing is done with react-testing-library'
  const author = 'Dijkstra'
  const post = {
    title, author
  }

  const component = render(
    <Post post={post} />
  )

  const header = component.container.querySelector('h4')

  console.log(prettyDOM(header))


})
import React from 'react'
import { render } from '@testing-library/react'
import SimplePost from './SimplePost'

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
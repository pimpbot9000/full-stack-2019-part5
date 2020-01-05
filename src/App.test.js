import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/posts')


describe('<App />', () => {


  test('render login when user not logged in', async () => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Login')
    )
    const username = component.container.querySelector('[name="Username"]')
    const password = component.container.querySelector('[name="Password"]')
    expect(username).not.toBe(null)
    expect(password).not.toBe(null)
  })

  test('posts are rendered if user is logged in', async () => {

    // mock logged in user by creating a token to mock local storage
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedInuser', JSON.stringify(user))

    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelectorAll('.post')
    )

    const notes = component.container.querySelectorAll('.post')
    expect(notes.length).toBe(3)
  })

})
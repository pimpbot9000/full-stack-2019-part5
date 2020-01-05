import React from 'react'
import PostForm from './PostForm'
import { render, fireEvent } from '@testing-library/react'

const Wrapper = ({ onSubmit, state }) => {

  const onTitleChanged = (event) => {
    state.title = event.target.value
  }

  const onUrlChanged = (event) => {
    state.url = event.target.value
  }

  return (
    <PostForm
      title={state.title}
      onSubmit={onSubmit}
      onTitleChanged={onTitleChanged}
      onUrlChanged={onUrlChanged}
    />
  )
}

test('<PostForm updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn()

  const state = {
    title: '',
    url: ''
  }

  const component = render(
    <Wrapper onSubmit={onSubmit} state={state} />
  )

  const titleInput = component.container.querySelector('[name="title"]')
  const urlInput = component.container.querySelector('[name="url"]')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, { target: { value: 'testing title' } })
  fireEvent.change(urlInput, { target: { value: 'testing url' } })

  fireEvent.submit(form)
  expect(onSubmit.mock.calls.length).toBe(1)

  expect(state.url).toBe('testing url')
  expect(state.title).toBe('testing title')

})
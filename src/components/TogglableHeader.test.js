import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TogglableHeader from './TogglableHeader'

describe('<TogglableHeader />', () => {
  let component

  beforeEach(() => {
    component = render(
      <TogglableHeader headerText='show'>
        <div className='testDiv' />
      </TogglableHeader>
    )
  })

  test('renders the header', () => {
    const h4 = component.container.querySelector('h4')
    expect(h4).toHaveTextContent('show')

  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})
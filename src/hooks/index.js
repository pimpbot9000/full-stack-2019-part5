import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearValue = () => {
    setValue('')
  }

  return {
    attributes: {
      type,
      value,
      onChange,
      name
    },
    value,
    type,
    clearValue
  }
}
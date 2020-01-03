import React, { useState, useImperativeHandle } from 'react'

const TogglableHeader = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const visibility = { display: visible ? '' : 'none' }

  const style = {
    backgroundColor: '#EEEEEE',
    padding: '10px',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (

    <div>
      <h4 onClick={toggleVisibility}>{props.header}</h4>
      <div style={visibility}>
        <div style={style}>
        {props.children}
        </div>
      </div>
    </div>
    
  )
})

export default TogglableHeader
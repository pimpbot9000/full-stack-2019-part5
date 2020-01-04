import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


// eslint-disable-next-line react/display-name
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
      <h4 onClick={toggleVisibility}>{props.headerText}</h4>
      <div style={visibility}>
        <div style={style}>
          {props.children}
        </div>
      </div>
    </div>

  )
})

TogglableHeader.propTypes = {
  headerText: PropTypes.string.isRequired
}

export default TogglableHeader
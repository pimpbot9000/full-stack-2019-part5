import React from 'react'
import MathJax from 'react-mathjax'

const MathBlock = ({ text }) => {
  return (
    <div>
      <MathJax.Provider>
        <MathJax.Node formula={text} />
      </MathJax.Provider>
    </div>
  )
}

export default MathBlock


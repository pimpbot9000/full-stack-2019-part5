import React from 'react'

const SimplePost = ({ post, onLike }) => (
  <div>
    <div>
      {post.title} by {post.author}
    </div>
    <div>
      blog has {post.likes} likes
      <button onClick={onLike}>like</button>
    </div>
  </div>
)

export default SimplePost
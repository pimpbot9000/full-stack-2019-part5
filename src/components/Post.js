import React from 'react'
import TogglableHeader from './TogglableHeader'

const Post = ({ post, user, onLike, onDelete }) => {

  const deleteButton = (post, user) => {

    if (user && post.user && user.username === post.user.username) {
      return <button onClick={onDelete}>delete me</button>
    }

    return null
  }

  return (

    <TogglableHeader headerText={`${post.title} by ${post.author}`}>
      <p>
        {post.likes} likes <button onClick={onLike}>Like!</button><br />
        Author: {post.author}<br />
        Added by user: {post.user && post.user.username}<br />
        {post.url && post.url !== '' && <>{post.url}<br /></>}
        {deleteButton(post, user)}
      </p>
    </TogglableHeader>

  )
}

export default Post
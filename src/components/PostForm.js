import React from 'react'

const PostForm = ({ title, onTitleChanged, url, onUrlChanged, onSubmit }) =>

  <form onSubmit={onSubmit}>
    <h1>Create new post</h1>
    <div>
      <p>Title:</p>
      <input type="text" value={title} name="title" onChange={onTitleChanged} />
    </div>
    <div>
      <p>Url:</p>
      <input type="text" value={url} name="url" onChange={onUrlChanged} />
    </div>
    <button type="submit">Save</button>
  </form>

export default PostForm
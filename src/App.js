import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import postsService from './services/posts'
import Togglable from './components/Togglable'
import Post from './components/Post'
import MathBlock from './components/MathBlock'

const App = () => {

  const loggedInUserKey = 'loggedInuser'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (user) {

      postsService
        .getAll().then(posts => {
          setPosts(posts.sort((a, b) => b.likes - a.likes))
        })
    }
  }, [user])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(loggedInUserKey)
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      postsService.setToken(user.token)
    }
  }, [])

  const showErrorMessage = message => {
    setMessage({ type: 'error', content: message })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const showNotification = message => {
    setMessage({ type: 'notification', content: message })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const onLogin = async event => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(loggedInUserKey, JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      postsService.setToken(loggedInUser.token)

    } catch (exception) {
      showErrorMessage('Wrong username or passwd')
    }
  }

  const onLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem(loggedInUserKey)
    setUser(null)
    setPosts([])
  }

  const postFormRef = React.createRef()

  const postForm = () => (
    <Togglable buttonLabel="Create post" ref={postFormRef}>
      <PostForm
        title={title}
        onTitleChanged={({ target }) => setTitle(target.value)}
        url={url}
        onUrlChanged={({ target }) => setUrl(target.value)}
        onSubmitPost={submitPost} />
    </Togglable>
  )

  const submitPost = async event => {
    event.preventDefault()

    postFormRef.current.toggleVisibility()
    try {
      const response = await postsService.create({ title, url })
      setTitle('')
      setUrl('')
      setPosts(posts.concat(response))
      showNotification(`Post ${response.title} by author ${response.author} added!`)

    } catch (exception) {
      showErrorMessage('Whoopsie. Failed to add post')
    }
  }

  const deletePost = async (id) => {
    const ok = window.confirm('Are you sure??')
    if (!ok) return

    try {

      await postsService.remove(id)
      setPosts(posts.filter(post => post.id !== id))

    } catch (exception) {
      showErrorMessage('unable to delete post')
    }
  }

  const like = async (id) => {
    try {
      const result = await postsService.like(id)
      setPosts(posts.map(post => post.id !== id ? post : result))
    } catch (exception) {
      showErrorMessage('oopsie! Internet did not like you liking')
    }
  }

  const math = 'f(x) = \\alpha\\cdot 5'
  return (
    <div className="App">
      <MathBlock text={math}/>
      <Notification message={message} />
      {user === null ?
        <div>
          <Togglable buttonLabel="Show Login">
            <LoginForm
              username={username}
              onUsernameChanged={({ target }) => setUsername(target.value)}
              password={password}
              onPasswordChanged={({ target }) => setPassword(target.value)}
              onLogin={onLogin}
            />
          </Togglable>
        </div>

        : //user not null -> render posts

        <div>
          <p>{user.name} logged in <button onClick={onLogout}>logout</button></p>
          {postForm()}
          <PostList posts={posts} onLike={like} user={user} onDelete={deletePost} />
        </div>}

    </div>
  )
}

const Notification = ({ message }) => {
  if (message == null) return null

  return (
    <div className={message.type}>{message.content}</div>
  )

}

const PostList = ({ posts, onLike, onDelete, user }) => {

  const rows = posts.map(post =>
    <div key={post.id}>
      <Post
        post={post}
        user={user}
        onLike={() => onLike(post.id)}
        onDelete={() => onDelete(post.id)} />
    </div>
  )

  return (
    <div>
      <h3>Posts</h3>
      {rows}
    </div>
  )
}

const PostForm = ({ title, onTitleChanged, url, onUrlChanged, onSubmitPost }) =>

  <form onSubmit={onSubmitPost}>
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

const LoginForm = ({ username, onUsernameChanged, password, onPasswordChanged, onLogin }) =>
  <div>
    <h2>Login</h2>
    <form onSubmit={onLogin}>
      <div>
        <p>Username</p>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={onUsernameChanged}
        />
      </div>
      <div>
        <p>Password</p>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={onPasswordChanged}
        />
      </div>
      <br />
      <button type="submit">login</button>
    </form>
  </div>
export default App

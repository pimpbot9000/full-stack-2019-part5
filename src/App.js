import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import postsService from './services/posts'
import Togglable from './components/Togglable'
import Post from './components/Post'
import PostForm from './components/PostForm'
import { useField } from './hooks'

const App = () => {

  const loggedInUserKey = 'loggedInuser'
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  const postFormRef = React.createRef()

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

  const onLogin = async () => {

    try {
      const loggedInUser = await loginService.login(
        {
          username: username.value,
          password: password.value
        }
      )

      window.localStorage.setItem(loggedInUserKey, JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      username.clearValue()
      password.clearValue()
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

  const postForm = () => (
    <Togglable buttonLabel="Create post" ref={postFormRef}>
      <PostForm
        title={title}
        onTitleChanged={({ target }) => setTitle(target.value)}
        url={url}
        onUrlChanged={({ target }) => setUrl(target.value)}
        onSubmit={submitPost} />
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

  return (
    <div className='App'>

      <Notification message={message} />
      {user === null ?
        <div>

          <LoginForm
            onLogin={onLogin}
            username={username}
            password={password}
          />

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
    <div key={post.id} className='post'>
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


const LoginForm = ({ username, password, onLogin }) => {


  const login = (event) => {
    event.preventDefault()
    onLogin()
  }


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <p>Username</p>
          <input
            {...username.attributes}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            {...password.attributes}
          />
        </div>
        <br />
        <button type="submit">login</button>
      </form>
    </div>)
}

export default App

import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import postsService from './services/posts'

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
    console.log(user)
    if (user) {
      console.log('load posts')
      postsService
        .getAll().then(posts => {
          setPosts(posts)
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
    setMessage({ type: "error", content: message })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const showNotification = message => {
    setMessage({ type: "notification", content: message })
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
      showErrorMessage('wrong credentials')
    }
  }

  const onLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem(loggedInUserKey)
    setUser(null)
  }

  const onSubmitPost = async event => {
    event.preventDefault()
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

  const loginForm = () =>
    <div>
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <div>
          <p>Username</p>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type="submit">login</button>
      </form>
    </div>

  return (
    <div className="App">

      <Notification message={message} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={onLogout}>logout</button></p>
          <PostForm
            title={title}
            setTitle={setTitle}
            url={url}
            setUrl={setUrl}
            onSubmitPost={onSubmitPost} />
          <PostList posts={posts} />
        </div>
      }
    </div>
  )
}

const Notification = ({ message }) => {
  if (message == null) return null

  return (
    <div className={message.type}>{message.content}</div>
  )

}

const PostList = ({ posts }) => {

  const rows = posts.map(item =>
    <li key={item.id}>
      {item.title}, {item.author}
    </li>
  )

  return (
    <ol>
      {rows}
    </ol>
  )
}

const PostForm = ({ title, setTitle, url, setUrl, onSubmitPost }) =>

  <form onSubmit={onSubmitPost}>
    <h1>Create new post</h1>
    <div>
      <p>Title:</p>
      <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
    </div>
    <div>
      <p>Url:</p>
      <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
    </div>
    <button type="submit">Save</button>
  </form>

export default App;

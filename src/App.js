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
    postsService
      .getAll().then(posts => {
        setPosts(posts)
      })
  }, [])

  useEffect ( () => {
    const loggedInUserJSON = window.localStorage.getItem(loggedInUserKey)
    if(loggedInUserJSON) {
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

  const onLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const loggedInUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(loggedInUserKey, JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      postsService.setToken(loggedInUser.token)
      console.log(loggedInUser)
      console.log(loggedInUser.token)
    } catch (exception) {
      showErrorMessage('wrong credentials')
      console.log('wrong credentials')
    }
  }

  const onLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem(loggedInUserKey)
    setUser(null)
    
    console.log("logout user")
  }

  const onSubmitPost = async event => {
    event.preventDefault()
    console.log('submit')
    try {
      const response = await postsService.create({ title, url })
      console.log(response)
    } catch (exception) {
      console.log('failed adding a new post')
    }
  }

  const loginForm = () =>
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

  return (
    <div className="App">
      <p>Hello world</p>
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

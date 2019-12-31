import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import postsService from './services/posts'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const showErrorMessage = message => {
    setMessage({ type: "error", content: message })
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const loggedInUser = await loginService.login({
        username, password,
      })
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      postsService.setToken(loggedInUser.token)
      console.log(loggedInUser)
    } catch (exception) {
      showErrorMessage('wrong credentials')
      //setErrorMessage('wrong credentials')
      console.log('wrong credentials')
    }
  }

  const loginForm = () =>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>

  return (
    <div className="App">
      <p>Hello world</p>
      <Notification message={message} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
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

export default App;

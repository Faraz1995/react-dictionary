import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './login.module.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

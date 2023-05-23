import type { FormEvent } from 'react'

import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { login } from '../auth'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault() // デフォルトの<form />の挙動を無効にする
    await login(email, password) // email・passwordを使ってログイン
    router.push('/dashboard') // ダッシュボードページへ遷移させる
  }

  return (
    <div>
      <h1>ログイン画面</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>

          <input
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
      <button type="button" onClick={() => router.push('/register')}>新規登録はこちら</button>
    </div>
  )
}

export default LoginPage
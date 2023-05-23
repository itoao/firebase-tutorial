import type { FirebaseApp } from 'firebase/app'
import type { Auth as FirebaseAuth } from 'firebase/auth'

import { getApps, initializeApp } from 'firebase/app'
import { 
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword 
} from 'firebase/auth'

/**
 * @description firebaseコンソールから取得したAPIキー群
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

/**
 * @description 初期化されたfirebaseAppsを返す
 */
export const getFirebaseApp = (): FirebaseApp | undefined => {
  if (typeof window === 'undefined') return // バックエンドで実行されないようにする

  return getApps()[0] || initializeApp(firebaseConfig)
}

/**
 * @description 初期化されたfirebaseAuthを返す
 */
export const getFirebaseAuth = (): FirebaseAuth => {
  return getAuth(getFirebaseApp())
}

/**
 * @description メールアドレスとパスワードで新規登録
 */
export const register = async (email: string, password: string) => {
  const auth = getFirebaseAuth()

  await createUserWithEmailAndPassword(auth, email, password)
}


/**
 * @description メールアドレスとパスワードでログイン
 */
export const login = async (email: string, password: string) => {
  const auth = getFirebaseAuth()

  const result = await signInWithEmailAndPassword(auth, email, password)

  const id = await result.user.getIdToken()

  // Cookieにセッションを付与するようにAPIを投げる
  await fetch('/api/session', { method: 'POST', body: JSON.stringify({ id }) })
}

/**
 * @description ログアウトさせる
 */
export const logout = async () => {
  // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
  await fetch('/api/sessionLogout', { method: 'POST' })
}
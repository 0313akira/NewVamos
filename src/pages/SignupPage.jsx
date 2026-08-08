// src/pages/SignupPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // React Router のページ移動用フック
  const navigate = useNavigate()

  const handleSignup = async () => {
    setErrorMessage("")
    try {
      // 1. Firebase Auth でアカウント作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, {
        displayName: name
      })


      // 3. 登録成功後、自動的にホーム画面へ移動する！ 🚀
      navigate("/home")
    } catch (error) {
      setErrorMessage("登録に失敗しました: " + error.code)
    }
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>👤 アカウント登録画面</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="名前を入力" 
      /><br />
      
      <input 
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="メールアドレス" 
      /><br />

      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="パスワード" 
      /><br />

      <button onClick={handleSignup}>登録</button>
    </div>
  )
}
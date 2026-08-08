import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin  = async () =>{
    try{
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/home")
} catch (error) {
      if(error.code === "auth/wrong-password"){
        alert("パスワードが間違っています" )
      }else if (error.code === "auth/user-not-found") {
    alert("このメールアドレスのユーザーは存在しません")
  } else {
    alert("ログイン失敗：" + error.message)
  }
    }}

  return (
    <div>
      <h1>Vomos!</h1>
      <h2> ログイン画面</h2>
      <input 
        type="text" 
        placeholder="メールアドレス" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input 
        type="password" 
        placeholder="パスワード" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>ログイン</button><br />
      <Link to="/signup">登録していない場合はこちら</Link>
    </div>
  )
}
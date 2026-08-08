import { useState, useEffect } from 'react'
import { auth } from "./firebase"
import { signOut } from "firebase/auth"
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate} from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'



// 🚀 メインのAppコンポーネント（全体を束ねる役割）
export default function App() {


  const [history, setHistory] = useState([]) // 投稿履歴を管理する状態 
  
  return(
    <BrowserRouter>
    <InnerApp history={history} setHistory={setHistory} />
      
    </BrowserRouter>
  )
}
function InnerApp({ history, setHistory }) {
  const navigate = useNavigate()
  const user = auth.currentUser
  
  const handleLogout = async ()=>{
    await signOut(auth)
    navigate("/")
  }
  function ProtectedRoute({ children }){
  const user = auth.currentUser
  const navigate = useNavigate()

 
  if(!user){
    return <Navigate to = "/" replace/>
  }
  return children
  }


return (
    <>
      {/* 画面上部のナビゲーションバー（URLを移動するリンクボタン） */}
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link to="/home">ホーム</Link>
        <Link to="/post">投稿</Link>
        <Link to="/search">検索・閲覧</Link>

        {user ? (
          <button onClick={handleLogout}>ログアウト</button>
        ) : (
          <Link to="/">ログイン</Link>
        )}
        
      </nav>

      {/* URLのパスに応じて、表示する画面（コンポーネント）を切り替えるエリア */}
      <Routes>

  <Route path="/" element={<LoginPage />} />

  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <HomePage history={history} setHistory={setHistory} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/post"
    element={
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    }
  />

  <Route
    path="/search"
    element={
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    }
  />

  <Route path="/signup" element={<SignupPage />} />
</Routes>

    </>
  )
}
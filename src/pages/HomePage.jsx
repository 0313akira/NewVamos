import { useEffect } from "react"
import { db, auth } from "../firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

export default function HomePage({ history, setHistory }) {

  useEffect(() => {
    // データベースから投稿データを新しい順に読み込んで画面に表示するための処理
    const q = query(collection(db, "posts"), orderBy("time", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          text: data.text,
          name: data.name,
          time: data.time ? data.time.toDate().toLocaleString() : ""
        }
      })
      setHistory(newPosts)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div style={{ textAlign: 'left' }}>

      <h1> ホーム画面</h1>
      <p>ようこそ、{auth.currentUser?.displayName}さん！</p>
      <p>現在ログイン中のメールアドレス: {auth.currentUser?.email}</p>
      <h2>投稿一覧</h2>
      {history.map((item) => (
        <div key={item.id}>
          <p><strong>{item.name}</strong></p>
          <p>{item.text}</p>
          <p>{item.time}</p>
        </div>
      ))}
    </div>
  )
}

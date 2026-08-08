import { useState,useEffect } from 'react'
import { db } from '../firebase'
import {collection,query,where,getDocs} from "firebase/firestore"


export default function SearchPage() {
  const [searchTag, setSearchTag] = useState("")
  const [keyword, setKeyword] = useState("")


  //データベースから投稿データを新しい順に読み込んで画面に表示するための処理
  useEffect(() => {
    const load = async () => {
      const q  = query(collection(db, "posts"),orderBy("time","desc"))
      const snapshot = await getDocs(q)
      const Posts = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          text: data.text,
          name: data.name,
          time: data.time ? data.time.toDate().toLocaleString() : ""
        }
      })
      setHistory(Posts)
    }
    load()

  }, [])

  return (
    <div style={{ textAlign: 'left' }}>
      <h1> 検索画面</h1>
      <input 
        type="text" 
        value={searchTag} 
        onChange={(e) => setSearchTag(e.target.value)} 
        placeholder="タグやキーワードで検索" 
      />
    </div>
  )
}
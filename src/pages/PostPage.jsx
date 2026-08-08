import { useState } from 'react'
import { db} from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function PostPage() {
  const [text, setText] = useState("")
 

  const handlePost = async () => {
    //投稿内容を確認して問題がなければデータベースに新しい投稿として保存する処理

    if(!text )return alert("投稿内容を入力してください")

      try{
         await addDoc(collection(db,"posts"),{
        text,time: serverTimestamp()
      })
      alert("投稿が完了しました")
      setText("")
    }catch(error){
      console.error("投稿に失敗しました",error)
      alert("投稿に失敗しました: " + error.message)

      }
     
     

    
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h1> 投稿画面</h1>
      <p>現在文字数: {text.length}/200</p>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="ここに文字を入力" 
      />

          <button onClick={handlePost}>投稿</button>
    </div>
  )
}
import { ChangeEvent, useState } from "react"
import App from "../App"

export const PostForm = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [show, setShow] = useState(false)
    const [flex, setFlex] = useState("flex")

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
      }
      const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value)
      }

      const addPost = async () => {
    
        if(title && body){
          let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: title,
              body: body,
              userId: 1
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          let json = await res.json();
    
        if(json.id){
          alert("Post adicionado com sucesso!");
        }
        setShow(true)
        setFlex("hidden")
      }else{
        alert("Preencha todos os campos!")
      }
      } 

    return(
        <>
        <div className={`${flex} fixed z-10 bg-stone-900 rounded inset-auto p-10`}>
        <fieldset className='border-2 p-5'>
          <legend className='text-slate-200'>New Post</legend>

          <input type="text" value={title} placeholder='Digite o título' className='border-2 mb-5 p-1' onChange={handleTitle}/>
          <textarea value={body} className='block border-2 p-2 w-full' placeholder='Digite o corpo da mensagem...' onChange={handleBody}></textarea>

          <button className='uppercase py-1 px-2 mt-2 bg-green-500 text-slate-200 block' onClick={addPost}>postar</button>
        </fieldset>
      </div>
      {show &&
        <App />
      }
        </>
      
    )
}
import { ChangeEvent, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Post } from './types/Post'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [display, setDisplay] = useState('hidden')
  const [displayPosts, setDisplayPosts] = useState('grid')
  const [showTitles, setShowTitles] = useState(true)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    loadPosts();
  }, [])

  const loadPosts = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await res.json();
     setPosts(json)
  }
  const handleNewPost = () => {
    setDisplay("flex");
    setDisplayPosts('hidden')
    setShowTitles(false)
  }

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  //New Post
  const addPost = async () => {
    setDisplay("hidden");
    setDisplayPosts('grid')
    setShowTitles(true)
    
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
  }else{
    alert("Preencha todos os campos!")
  }
  }

  return (
    <div className="App flex flex-col p-10 relative">

      {showTitles &&
         <button className='fixed bottom-5 right-5 bg-green-500 z-20 rounded p-2 text-slate-200'
         onClick={handleNewPost}>
           New Post
         </button>
      }
     

      <div className={`${display} fixed z-10 bg-stone-900 rounded inset-auto p-10`}>
        <fieldset className='border-2 p-5'>
          <legend className='text-slate-200'>New Post</legend>

          <input type="text" placeholder='Digite o título' className='border-2 mb-5 p-1' onChange={handleTitle}/>
          <textarea className='block border-2 p-2 w-full' placeholder='Digite o corpo da mensagem...' onChange={handleBody}></textarea>

          <button className='uppercase py-1 px-2 mt-2 bg-green-500 text-slate-200 block' onClick={addPost}>postar</button>
        </fieldset>
      </div>

      {showTitles &&
        <h1 className='text-3xl uppercase font-serif text-center mb-10'>Postagens</h1>
      }
      
      <div className={`${displayPosts} gap-10 grid-cols-3`}>

        {posts.map((post, index) => (
          <div key={index} className='flex flex-col bg-stone-900 rounded p-10 items-center relative'>

            <h2 className='text-sm text-slate-200 uppercase mb-5'>{post.title}</h2>

            <h3 className='text-xs text-slate-200'>{post.body}{post.body}</h3>

            <p className='text-xs text-slate-200 absolute bottom-0 left-0 ml-5 mb-2'>#{post.id}</p>

          </div>

        ))}
      </div>
    </div>
  )
}

export default App

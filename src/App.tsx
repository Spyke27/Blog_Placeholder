import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Post } from './types/Post'

function App() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    loadPosts();
  }, [])

  const loadPosts = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await res.json();
     setPosts(json)
  }

  return (
    <div className="App flex flex-col p-10">
      <h1 className='text-3xl uppercase font-serif text-center mb-10'>Postagens</h1>
      <div className='grid gap-10 grid-cols-3'>

        {posts.map((post, index) => (
          <div key={index} className='flex flex-col bg-stone-900 rounded p-10 items-center relative'>

            <h2 className='text-sm text-slate-200 uppercase mb-10'>{post.title}</h2>

            <h3 className='text-xs text-slate-200'>{post.body}</h3>

            <p className='text-xs text-slate-200 absolute bottom-0 left-0 ml-5 mb-2'>#{post.id}</p>

          </div>

        ))}
      </div>
    </div>
  )
}

export default App

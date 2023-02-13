import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { Post } from './types/Post'
import { PostForm } from './components/PostForm'
import { PostItem } from './components/PostItem'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [displayPosts, setDisplayPosts] = useState('grid')
  const [showTitles, setShowTitles] = useState(true)

  useEffect(() => {
    loadPosts();
  }, [])

  const loadPosts = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await res.json();
     setPosts(json)
  }

  const handleNewPost = () => {
    setDisplayPosts('hidden')
    setShowTitles(false)
  }

  return (
    <div className="App flex flex-col p-10 relative">

    {!showTitles && <PostForm />}

      {showTitles &&
         <button className='fixed bottom-5 right-5 bg-green-500 z-20 rounded p-2 text-slate-200'
         onClick={handleNewPost}>New Post</button>
      }

      {showTitles && <h1 className='text-3xl uppercase font-serif text-center mb-10'>Postagens</h1>}
      
      <div className={`${displayPosts} gap-10 grid-cols-3`}>
        {posts.map((post, index) => (
            <PostItem data={post}/>
        ))}
      </div>
      
    </div>
  )
}

export default App

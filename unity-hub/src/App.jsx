import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Post from './Components/Postcard/Post'
import Poll from './Components/Poll/Poll'


const App = () => {
  return (
    <div className='app'>
  <Navbar/>
  <div className='content'>
    <div className='posts'>
      <Post/>
      <Post username="Sarah Johnson" time="2h ago" content="Just launched my new project! 🚀" likes={24} comments={8} />
          <Post username="Mike Chen" time="4h ago" content="What's your favorite programming language? Vote in the poll below! 👇" likes={15} comments={32} />

    </div>
    <Poll/>

  </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react';
import './App.css';
import MainForm from './Components/BlogForm/MainForm';
import BlogPostsList from './Components/Posts/BlogPostsList';

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('http://localhost:5000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(fetchPosts, []);

  return (
    <div className='OuterDiv'>
      <header>
        <MainForm onPostSubmit={fetchPosts} />
        <BlogPostsList posts={posts} onPostDelete={fetchPosts} />
      </header>
    </div>
  );
}

export default App;

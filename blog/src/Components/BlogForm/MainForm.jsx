import React, { useState } from 'react'
import './MainForm.css'

function MainForm({ onPostSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formBlogPost = {
      title: title,
      content: content,
    };

    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBlogPost)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('New blog post added:', data)
      alert('The post was successfully posted to the database.')
      onPostSubmit();
    })
    .catch((error) => {
      console.error('Error adding the blog post!', error)
      alert('There was an error adding the post to the database :(')
    }) 
  }

  return (
    <div className='FormDiv'>
      <h1>Create a new blog post!</h1>
      <form onSubmit={handleFormSubmit} className='Form'>
        <label className='FormText'>
          Title of your blog Post:
        </label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='FormTextInput'/>
        <label className='FormText'>
          The content of your post:
        </label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className='FormTextArea'/>
        <button type='submit' className='FormButton'>Post!</button>
      </form>
    </div>
  )
}

export default MainForm
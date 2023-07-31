import './BlogPost.css'
import React from 'react'

function BlogPost({id, title, content, onDelete}) {
    const handleDelete = () => {
        fetch(`http://localhost:5000/api/posts/}`, {
            method: 'DELETE',
        })
        .then(() => {
            alert('Post deleted successfully!')
            onDelete();
        })
        .catch((error) => {
            console.error('There was an error deleting the post!: ', error)
            alert('There was an error deleting the post!')
        })
    }

  return (
    <div className='BlogPostDiv'>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={handleDelete}>X</button>
    </div>
  )
}

export default BlogPost
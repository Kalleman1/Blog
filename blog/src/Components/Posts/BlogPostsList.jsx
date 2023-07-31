import React from 'react';
import BlogPost from './BlogPost';
import './BlogPostsList.css'

function BlogPostsList({ posts, onPostDelete }) { // <-- receive posts as a prop

  return (
    <div className='BlogPostsList'>
      <h1>Recent Posts!</h1>
      {posts.map((post) => (
        <BlogPost 
        key={post.id} 
        id={post.id}
        title={post.title} 
        content={post.content} 
        onDelete={onPostDelete}
        />
      ))}
    </div>
  );
}

export default BlogPostsList;
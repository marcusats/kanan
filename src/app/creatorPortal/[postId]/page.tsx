'use client'
import React, { useEffect, useState } from 'react';


interface Post {
  image: string;
  link: string;
}

const ActivePost = ({
    params,
  }: {
    params: { postId: string };
  }) => {

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Mocking post data instead of fetching from an API
    const mockPostData = {
      image: 'https://via.placeholder.com/600',
      link: 'https://example.com',
    };
    setPost(mockPostData);
  }, [params.postId]);

  if (!post) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">Active post: {params.postId}</h1>
      <a href={post.link} target="_blank" rel="noopener noreferrer">
        <img src={post.image} alt="Post" className="max-w-full h-auto border-8 border-pink-500 rounded-lg shadow-lg" />
      </a>
    </div>
  );
};

export default ActivePost;

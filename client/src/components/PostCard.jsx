// FILE: client/src/components/PostCard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const PostCard = ({ post, onUpdate }) => {
  const [isLiked, setIsLiked] = useState(post.likes?.includes(localStorage.getItem('userId')) || false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = async () => {
    try {
      const { data } = await axios.post(`/api/posts/${post._id}/like`);
      setIsLiked(data.isLiked);
      setLikesCount(data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await axios.post(`/api/posts/${post._id}/comment`, { text: comment });
      setComment('');
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInSeconds = Math.floor((now - posted) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Link to={`/${post.user?.username}`}>
          <img
            src={post.user?.profilePicture}
            alt={post.user?.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1">
          <Link to={`/${post.user?.username}`} className="font-semibold hover:underline">
            {post.user?.fullName}
          </Link>
          <p className="text-sm text-gray-500">@{post.user?.username} · {formatDate(post.createdAt)}</p>
        </div>
      </div>

      {post.caption && (
        <p className="mb-4 text-gray-800 whitespace-pre-wrap">{post.caption}</p>
      )}

      {post.images && post.images.length > 0 && (
        <Link to={`/post/${post._id}`}>
          <div className="mb-4 rounded-2xl overflow-hidden">
            <img
              src={post.images[0].url}
              alt="Post"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="flex items-center space-x-6 mb-4 text-gray-600">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
            isLiked ? 'text-red-500' : ''
          }`}
        >
          <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="font-medium">{likesCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
        >
          <span className="text-xl">💬</span>
          <span className="font-medium">{post.comments?.length || 0}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
          <span className="text-xl">🔗</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-purple-500 transition-colors">
          <span className="text-xl">🔖</span>
        </button>
      </div>

      {showComments && (
        <div className="border-t pt-4 space-y-4">
          {post.comments?.map((comment) => (
            <div key={comment._id} className="flex space-x-3">
              <img
                src={comment.user?.profilePicture}
                alt={comment.user?.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{comment.user?.fullName}</p>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}

          <form onSubmit={handleComment} className="flex space-x-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-6 py-2 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
};

export default PostCard;
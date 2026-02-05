// FILE: client/src/components/RightPanel.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const RightPanel = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    loadSuggestedUsers();
  }, []);

  const loadSuggestedUsers = async () => {
    try {
      const { data } = await axios.get('/api/users/suggested');
      setSuggestedUsers(data);
    } catch (error) {
      console.error('Error loading suggested users:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`/api/users/${userId}/follow`);
      setSuggestedUsers(suggestedUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-0 top-0 h-screen w-80 glass border-l border-gray-200 p-6 overflow-y-auto scrollbar-hide"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Suggested For You</h2>
          <div className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user._id} className="flex items-center justify-between">
                <Link to={`/${user.username}`} className="flex items-center space-x-3 flex-1 min-w-0">
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.fullName}</p>
                    <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleFollow(user._id)}
                  className="px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
          <div className="space-y-3">
            {['#DesignInspiration', '#AIArt', '#Photography', '#WebDev'].map((tag) => (
              <div key={tag} className="p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <p className="font-medium text-purple-600">{tag}</p>
                <p className="text-sm text-gray-500">1.2k posts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default RightPanel;
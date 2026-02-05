import { motion } from 'framer-motion';

export const Notifications = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Notifications coming soon...</p>
      </div>
    </motion.div>
  );
};

export const PostDetail = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Post Detail</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Post detail page coming soon...</p>
      </div>
    </motion.div>
  );
};

export const Communities = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Communities</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Communities feature coming soon...</p>
      </div>
    </motion.div>
  );
};

export const CommunityDetail = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Detail</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Community detail coming soon...</p>
      </div>
    </motion.div>
  );
};

export const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Settings page coming soon...</p>
      </div>
    </motion.div>
  );
};
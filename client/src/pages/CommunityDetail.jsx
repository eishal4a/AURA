import { motion } from 'framer-motion';

const CommunityDetail = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community Detail</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Community detail coming soon...</p>
      </div>
    </motion.div>
  );
};

export default CommunityDetail;
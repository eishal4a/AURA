import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="card p-12 text-center">
        <p className="text-gray-600 text-lg">Settings page coming soon...</p>
      </div>
    </motion.div>
  );
};

export default Settings;
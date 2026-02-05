import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      {/* Pink glow background */}
      <div className="absolute w-[700px] h-[700px] bg-pink-600 rounded-full blur-[200px] opacity-20 -top-40 -left-40"></div>
      <div className="absolute w-[700px] h-[700px] bg-pink-500 rounded-full blur-[200px] opacity-20 -bottom-40 -right-40"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-white">
            AURA
          </h1>
          <p className="text-white/40 mt-3 text-sm">
            Create your digital aura
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Full name"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Email address"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-4 text-white/30 text-xs tracking-widest">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Login link */}
          <p className="text-center text-white/40 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-500 font-semibold hover:text-pink-400 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

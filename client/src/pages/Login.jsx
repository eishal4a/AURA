import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
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
            Welcome back to your digital aura
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
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-4 text-white/30 text-xs tracking-widest">OR</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Signup */}
          <p className="text-center text-white/40 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-pink-500 font-semibold hover:text-pink-400 transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

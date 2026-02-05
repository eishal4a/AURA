import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-pink-500/20">
    <div className="w-full flex items-center justify-between px-12 py-4">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-pink-500 tracking-wider">
          AURA
        </Link>

        {/* Search */}
        <div className="hidden md:block w-1/3">
          <input
            placeholder="Search AURA..."
            className="input-field"
          />
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-8 text-white/70">
          <Link to="/" className="hover:text-pink-500">Home</Link>
          <Link to="/explore" className="hover:text-pink-500">Explore</Link>
          <Link to="/messages" className="hover:text-pink-500">Messages</Link>
          <Link to="/profile" className="hover:text-pink-500">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // close dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-red-500/20">
      <div className="flex justify-between items-center px-12 py-4">

        <Link to="/" className="text-3xl font-bold text-red-500">
          AURA
        </Link>

        <div className="flex gap-8 items-center text-white/70">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>

          {user && (
            <div className="relative" ref={menuRef}>
              {/* Avatar */}
              <img
                src={user.profilePicture}
                alt="profile"
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-500"
              />

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 glass p-4 rounded-xl shadow-xl text-sm">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-red-500"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/settings");
                      setOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-red-500"
                  >
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="block w-full text-left py-2 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;

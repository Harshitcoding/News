import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-orange-500 px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-white font-bold text-xl tracking-wide">
        HackerNews 📰
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white text-sm hidden sm:block">
              👋 {user.name}
            </span>
            <Link
              to="/bookmarks"
              className="text-white text-sm hover:underline"
            >
              Bookmarks
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-orange-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white text-sm hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-orange-500 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-orange-100 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
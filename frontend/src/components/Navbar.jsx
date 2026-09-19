import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white text-[11px] py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]">
        <span>🎓 Authorized Haryana Board & NCERT School Books</span>
        <span className="hidden sm:inline text-gray-400">•</span>
        <span className="hidden sm:inline">📦 Wholesale & Retail Stationery Depot</span>
        <span className="hidden md:inline text-gray-400">•</span>
        <a
          href="https://wa.me/919812064112"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline text-emerald-300 hover:text-emerald-200 underline font-semibold"
        >
          WhatsApp: +91 98120 64112
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="flex items-center justify-between py-3.5 font-medium">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} className="w-32 sm:w-36 hover:scale-105 transition-transform" alt="Goyal Book Depot" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center gap-1 md:gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'hover:bg-gray-100 hover:text-black'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'hover:bg-gray-100 hover:text-black'
                }`
              }
            >
              All Books & Stationery
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'hover:bg-gray-100 hover:text-black'
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-sm'
                    : 'hover:bg-gray-100 hover:text-black'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Icon */}
            <button
              onClick={() => {
                setShowSearch(true);
                navigate('/collection');
              }}
              title="Search Books"
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={assets.search_icon} className="w-4 h-4" alt="Search" />
            </button>

            {/* Profile Dropdown */}
            <div className="group relative">
              {token ? (
                <button
                  type="button"
                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-semibold text-gray-800"
                >
                  <img className="w-4 h-4" src={assets.profile_icon} alt="Profile" />
                  <span className="hidden md:inline">Account</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-black hover:bg-gray-800 rounded-full shadow-sm transition-all flex items-center gap-1.5"
                >
                  <img className="w-3.5 h-3.5 invert" src={assets.profile_icon} alt="Login" />
                  <span>Login</span>
                </button>
              )}

              {/* Dropdown Menu when logged in */}
              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-2 z-50 animate-fadeIn">
                  <div className="flex flex-col gap-1 w-44 py-2 px-2 bg-white text-gray-700 rounded-xl shadow-xl border border-gray-100 text-xs">
                    <button
                      onClick={() => navigate('/orders')}
                      className="px-3 py-2 text-left hover:bg-gray-50 rounded-lg font-medium flex items-center gap-2"
                    >
                      <span>📦</span> My Orders
                    </button>
                    <button
                      onClick={logout}
                      className="px-3 py-2 text-left hover:bg-red-50 text-red-600 rounded-lg font-medium flex items-center gap-2"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              title="View Cart"
            >
              <img src={assets.cart_icon} className="w-5 h-5 min-w-5" alt="Cart" />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-indigo-600 text-white font-bold text-[10px] px-1 rounded-full shadow-sm animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setVisible(true)}
              className="p-2 sm:hidden text-gray-700 hover:text-black"
              title="Open Menu"
            >
              <img src={assets.menu_icon} className="w-5" alt="Menu" />
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {visible && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setVisible(false)}
          >
            <div
              className="absolute top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <img src={assets.logo} className="w-28" alt="Logo" />
                  <button
                    onClick={() => setVisible(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
                  <NavLink
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                    to="/collection"
                  >
                    All Books & Stationery
                  </NavLink>
                  <NavLink
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                    to="/about"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    onClick={() => setVisible(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-xl ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`
                    }
                    to="/contact"
                  >
                    Contact & Location
                  </NavLink>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                <p>📞 +91 98120 64112</p>
                <p>✉️ contact@goyalbookstore.com</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;

import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowProfileCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowProfileCard(false);
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    `block px-4 py-2 font-medium ${
      isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
    }`;

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-yellow-400">
          MyStore
        </h1>
      
  
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/products" className={navLinkStyle}>Product</NavLink>
          <NavLink to="/addproducts" className={navLinkStyle}>Add Product</NavLink>

          {!user ? (
            <NavLink to="/login" className={navLinkStyle}>
              Login
            </NavLink>
          ) : (
            <div className="relative" ref={cardRef}>
              <FaUserCircle
                size={28}
                className="text-white cursor-pointer"
                onClick={() => setShowProfileCard(!showProfileCard)}
              />

              {showProfileCard && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4">
                  <p className="font-semibold">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden text-white text-2xl cursor-pointer">
          {menuOpen ? (
            <FaTimes onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          <NavLink to="/" className={navLinkStyle} onClick={()=>setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/products" className={navLinkStyle} onClick={()=>setMenuOpen(false)}>Product</NavLink>
          <NavLink to="/addproducts" className={navLinkStyle} onClick={()=>setMenuOpen(false)}>Add Product</NavLink>

          {!user ? (
            <NavLink to="/login" className={navLinkStyle} onClick={()=>setMenuOpen(false)}>
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
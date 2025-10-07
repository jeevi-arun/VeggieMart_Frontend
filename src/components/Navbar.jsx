import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart = [] } = useContext(CartContext);

  // Detect login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //  Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-10 w-full z-40 bg-gray-100 shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        <Link to="/" className="text-2xl font-bold">
          VeggieMart
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-transparent border border-gray-400 rounded-2xl overflow-hidden ml-4"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-1 text-black outline-none w-40 md:w-60"
          />
          <button type="submit" className="text-black px-3 py-1">
            🔍
          </button>
        </form>

        {/*  Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/cart" className="relative hover:underline">
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="hover:underline text-red-600 font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>

        {/*  Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 text-white px-6 py-4 space-y-4">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block hover:underline" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/cart" className="block hover:underline" onClick={() => setMenuOpen(false)}>
            Cart ({cart.length})
          </Link>

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-red-400 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

function Navbar({ search, setSearch, user, onLogout }) {
  const [showInput, setShowInput] = useState(false);

  return (
    <nav className="site-navbar sticky top-0 z-10 border-b border-(--border) bg-(--bg)/90 backdrop-blur" aria-label="Main navigation">
      <div className="site-navbar_content mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
        <div className="site-navbar_links flex items-center gap-5">
          <Link
            onClick={(e) => setSearch("") || setShowInput(false)}
            to="/"
            className='text-sm font-semibold text-(--text-h) transition hover:text-(--accent)'
          >
            Home
          </Link>

          {user ? (
            <>
              <Link
                onClick={(e) => setSearch("") || setShowInput(false)}
                to="/create"
                className='text-sm font-medium transition hover:text-(--accent)'
              >
                Create Review
              </Link>
              <Link
                onClick={(e) => setSearch("") || setShowInput(false)}
                to="/wishlist"
                className='text-sm font-medium transition hover:text-(--accent)'
              >
                Wishlist
              </Link>
              <button
                onClick={onLogout}
                className="rounded-md border border-(--border) px-3 py-1.5 text-sm font-medium transition hover:border-(--accent) hover:text-(--accent)"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                onClick={(e) => setSearch("") || setShowInput(false)}
                to="/login"
                className='text-sm font-medium transition hover:text-(--accent)'
              >
                Login
              </Link>
              <Link
                onClick={(e) => setSearch("") || setShowInput(false)}
                to="/signup"
                className='rounded-md bg-(--accent) px-3 py-1.5 text-sm font-medium text-white transition hover:opacity-90'
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className='relative flex items-center'>
          <button
            onClick={() => setShowInput(!showInput)}
            className='rounded-md p-2 text-lg transition hover:bg-(--accent-bg) hover:text-(--accent)'
          >
            <CiSearch />
          </button>
          {showInput && (
            <input
              className="search-navbar absolute right-0 top-full mt-2 w-56 rounded-md border border-(--border) bg-(--bg) px-3 py-1.5 text-sm shadow-(--shadow) outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)"
              type="text"
              placeholder="Search Game..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
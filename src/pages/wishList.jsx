import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getProtected } from '../api/auth';

// A page to TEST the protected backend endpoint. ProtectedRoute makes sure you
// can only get here when logged in; the button then calls /api/protected and
// shows what came back.
//
// This is the one place where the two kinds of login look different in the
// frontend, so it's worth reading closely:
//
// password user -> the JWT is in an httpOnly cookie. We send NOTHING extra;
//                  the browser attaches the cookie by itself.
// Auth0 user    -> the token lives inside Auth0's SDK, so we have to fetch
//                  it and send it in an Authorization header.
//
// The backend's requireAuth accepts either, which is why ONE endpoint serves
// both. Look at via in the response to see which door you came through.
export default function WishList({ user }) {
  const { isAuthenticated: isAuth0User, getAccessTokenSilently } = useAuth0();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

async function getWishlist() {
      const API_URL = "https://games-app-backend-6h13.onrender.com";
      const response = await fetch(`${API_URL}/wishlist`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data)
      setWishlist(data);
    }

  useEffect(() => {
    
    getWishlist();
  }, []);

  async function handleTest() {
    setError(null);
    setResult(null);
    setIsLoading(true);
    try {
      // Only ask Auth0 for a token if the session actually CAME from Auth0.
      // Calling this for a password user throws "Login required".
      const token = isAuth0User ? await getAccessTokenSilently() : undefined;
      const data = await getProtected(token);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
async function handleDeletewishlist(gameReviewId) {
      const API_URL = "https://games-app-backend-6h13.onrender.com";
    const response = await fetch(`${API_URL}/${gameReviewId}/wishlist/delete`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete Game from wishlist");
      return
    }
    alert("You deleted this Game from wishlist")
    
    getWishlist()
}
  return (
    <section className='mx-auto w-full max-w-2xl'>
      <h1 className='mb-6 text-3xl font-semibold text-(--text-h)'>WishList</h1>
      {error && <p className='mt-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500'>{error}</p>}
      <div className='flex flex-col gap-4'>
        {wishlist.map((item) => (
          <div key={item.id} className='rounded-xl border border-(--border) p-4 shadow-(--shadow)'>
            <h3 className='font-medium text-(--text-h)'>{item["Game Review"].title}</h3> 
             <button onClick={() => handleDeletewishlist(item.gameReviewId)}> Delete</button>
          </div>
        ))}

      </div>
    </section>
  );
}
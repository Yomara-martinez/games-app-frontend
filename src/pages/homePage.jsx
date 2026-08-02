import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

function HomePage({ search, setSearch }) {
  const [reviews, setReviews] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      const API_URL = "https://games-app-backend-6h13.onrender.com";
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(search.toLowerCase()) ||
      review.genre.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="page-container">
      <h1 className='mb-6 text-3xl font-semibold text-(--text-h)'>All Reviews</h1>
      {filteredReviews.length === 0 ? (
        <p className='text-sm'>No reviews have been created</p>
      ) : (
        <div className="poll-list grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredReviews.map((review) => (
            <Link
              onClick={(e) => setSearch("") || setShowInput(false)}
              to={`${review.id}`}
              className='block transition hover:-translate-y-0.5'
            >
              <ReviewCard review={review} mode="summary" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
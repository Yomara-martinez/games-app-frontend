import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router";

function HomePage() {
  const [reviews, setReviews] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    async function fetchReviews() {
      const API_URL = "http://localhost:8080";
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setReviews(data);
      console.log(reviews);
    }
    fetchReviews();
  }, []);

  return (
    <main className="page-container">
      <h1>All Reviews</h1>
      {reviews.length === 0 && <p>No reviews have been created.</p>}

      <div className="poll-list">
        {reviews.map((item) => (
          <Link to={`${item.id}`}>
            <ReviewCard key={item.id} review={item} mode="summary" />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default HomePage;

import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

function HomePage({ search }) {
  const [reviews, setReviews] = useState([]);

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

  const filteredReviewsTitle = reviews.filter((review) =>
    review.title.toLowerCase().includes(search.toLowerCase()),
  );
 const filteredReviewsGenre = reviews.filter((review) =>
    review.genre.toLowerCase().includes(search.toLowerCase()),
  );
  
  
 const filteredReviews = filteredReviewsGenre && filteredReviewsTitle //fix this>>>>
  return (
    <main className="page-container">
      <h1>All Reviews</h1>

{filteredReviews.length ===0 ? (
  <p>No reviews have been created</p>
) : (
        <div className="poll-list">
          {filteredReviews.map((review) => (
            <Link to={`${review.id}`}>
              <ReviewCard key={review.id} review={review} mode="summary" />
            </Link>
          ))}
        </div>
)}
    </main>
  
  );
}


export default HomePage;

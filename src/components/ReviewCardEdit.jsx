import { useState, useEffect } from "react";
import { Link } from "react";

function ReviewCardEdit({ review, updateReview, handleView }) {
  const [description, setDescription] = useState(review.description);
  const [rating, setRating] = useState(review.rating);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const trimmedRating = rating;
    if (!trimmedRating || !trimmedDescription) {
      setError("Enter a title, description, rating and genre please.");
      return;
    }

    const API_URL = "http://localhost:8080";
    const response = await fetch(`${API_URL}/${review.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: trimmedDescription,
        rating: trimmedRating,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create Review!!");
    }

    const editReview = await response.json();
    updateReview(editReview);
    handleView(false);
  }

  if (!review) {
    return <p>Loading...</p>;
  }
  useEffect(() => {}, [review]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{review.title} </h1>
        <div>Duration: {review.duration}h </div>
        <div>
          Genre: {review.genre} 
        </div>
        <label>Description</label>
        <textarea
          id="review-description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label>Rating</label>
          <input
            id="review-rating"
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        <button type="submit">Save Edits</button>
      </form>
    </div>
  );
}

export default ReviewCardEdit;

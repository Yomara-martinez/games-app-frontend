import { useState } from "react";

const Genre = [
  "Action",
  "Action-Adventure",
  "Adventure",
  "Puzzle",
  "Role-Playing",
  "Simulation",
  "Strategy",
  "Sports",
  "MMO",
  "Horror",
  "Fighting",
  "Shooter",
  "Survival",
  "Educational",
];

function EditReview({ review, updateReview, handleView }) {
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

  return (
    <main>
      <section></section>

      <section>
        <form onSubmit={handleSubmit} noValidate>
          <label>Description</label>
          <input
            id="review-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <label>Rating</label>
          <input
            id="review-rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button type="submit">Edit Review</button>
        </form>
      </section>
    </main>
  );
}

export default EditReview;

import { useState, useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router";

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

function CreateReview({}) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedDuration = duration.trim();
    const trimmedRating = rating.trim();
    const trimmedGenre = genre.trim();
    if (
      !trimmedTitle ||
      !trimmedRating ||
      !trimmedGenre ||
      !trimmedDescription
    ) {
      setError("Enter a title, description, rating and genre please.");
      return;
    }

    const API_URL = "http://localhost:8080";
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: trimmedTitle,
        description: trimmedDescription,
        duration: trimmedDuration,
        rating: trimmedRating,
        genre: trimmedGenre,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create Review!!");
    }

    const createdReview = await response.json();
    navigate(`/${createdReview.id}`);
  }

  return (
    <main>
      <section>
        <h1>create your own review!!</h1>
      </section>

      <section>
        <form onSubmit={handleSubmit} noValidate>
          <label>Title </label>
          <input
            id="review-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type the game title"
          />

          <label>Description </label>
          <textarea
            id="review-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <label>Duration </label>
          <input
            id="review-duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="duration in hours"
          />
          <label>Genre </label>
          <select
            id="review-Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Chose a genre</option>
            {Genre.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <label>Rating </label>
          <input
            id="review-rating"
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button type="submit">Summit Review</button>
        </form>
      </section>
    </main>
  );
}

export default CreateReview;

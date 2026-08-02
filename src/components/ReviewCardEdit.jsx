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

    const API_URL = "https://games-app-backend-6h13.onrender.com";
    const response = await fetch(`${API_URL}/${review.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
    <div className='rounded-xl border border-(--border) p-5 shadow-(--shadow)'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <h1 className='text-xl font-semibold text-(--text-h)'>{review.title} </h1>
        <div className='text-sm'>Duration: {review.duration}h </div>
        <div className='text-sm'> Genre: {review.genre} </div>

        {error && (
          <p role='alert' className='rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500'>
            {error}
          </p>
        )}

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='review-description' className='text-sm font-medium text-(--text-h)'>
            Description
          </label>
          <textarea
            id="review-description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='review-rating' className='text-sm font-medium text-(--text-h)'>
            Rating
          </label>
          <input
            id="review-rating"
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
          />
        </div>

        <button
          type="submit"
          className='mt-2 rounded-md bg-(--accent) px-4 py-2.5 font-medium text-white transition hover:opacity-90'
        >
          Save Edits
        </button>
      </form>
    </div>
  );
}

export default ReviewCardEdit;
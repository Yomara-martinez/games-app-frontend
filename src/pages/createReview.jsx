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

    const API_URL = "https://games-app-backend-6h13.onrender.com";
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      credentials: "include",
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
    <main className='mx-auto w-full max-w-md'>
      <section className='mb-6'>
        <h1 className='text-3xl font-semibold text-(--text-h)'>create your own review!!</h1>
      </section>
      <section className='rounded-xl border border-(--border) p-6 shadow-(--shadow) sm:p-8'>
        <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
          {error && (
            <p role='alert' className='rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500'>
              {error}
            </p>
          )}

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='review-title' className='text-sm font-medium text-(--text-h)'>Title </label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type the game title"
              className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='review-description' className='text-sm font-medium text-(--text-h)'>Description </label>
            <textarea
              id="review-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="5"
              cols="33"
              className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='review-duration' className='text-sm font-medium text-(--text-h)'>Duration </label>
            <input
              id="review-duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="duration in hours"
              className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='review-Genre' className='text-sm font-medium text-(--text-h)'>Genre </label>
            <select
              id="review-Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className='w-full rounded-md border border-(--border) bg-transparent px-3 py-2 outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent-bg)'
            >
              <option value="">Chose a genre</option>
              {Genre.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label htmlFor='review-rating' className='text-sm font-medium text-(--text-h)'>Rating </label>
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
            Summit Review
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateReview;
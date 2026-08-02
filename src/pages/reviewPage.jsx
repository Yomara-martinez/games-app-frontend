import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewCard from "../components/ReviewCard";
import CreateReview from "./createReview";
import EditReview from "../components/EditReview";
import ReviewCardEdit from "../components/ReviewCardEdit";
import { useNavigate } from "react-router";
import { TiHeart } from "react-icons/ti";
import { BiSolidDislike } from "react-icons/bi";
import { GiBeveledStar } from "react-icons/gi";

function ReviewPage({ user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [copied, setCopied] = useState(false); //to share the review
  const [editingReview, setEditingReview] = useState(false);
  const [reaction, setReaction]= useState(null);

  async function getReview() {
    const API_URL = "https://games-app-backend-6h13.onrender.com";
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    setReview(data);
  }

  useEffect(() => {
    getReview();
  }, []);

  function getLikes(gameReview) {
    return gameReview?.likes?.length ?? 0;
  }

  function getDislikes(gameReview) {
    return gameReview?.Dislikes?.length ?? 0;
  }

  async function handleDislike() {
    setReaction("dislike");
    if (!review) {
      return;
    }

    const API_URL = "https://games-app-backend-6h13.onrender.com";

    const response = await fetch(`${API_URL}/${id}/dislike`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameReviewId: review.id,
      }),
    });

    if (!response.ok) {
      alert("You already Disliked this review.");
      console.log(await response.text());
      return;
    }
    await getReview();
  }

  async function handleLike() {
    setReaction("Like");
    if (!review) {
      return;
    }

    const API_URL = "https://games-app-backend-6h13.onrender.com";

    const response = await fetch(`${API_URL}/${id}/like`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameReviewId: review.id,
      }),
    });

    if (!response.ok) {
      alert("You already liked this review.");
      console.log(await response.text());
      return;
    }
    await getReview();
  }

  async function deleteReview() {
    const API_URL = "https://games-app-backend-6h13.onrender.com";
    const response = await fetch(`${API_URL}/${id}/delete`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete Review");
      return;
    }
    alert("You deleted this Review");
    navigate(`/`);
  }

  async function addToWishlist(gameReviewId) {
    const API_URL = "https://games-app-backend-6h13.onrender.com";

    const response = await fetch(`${API_URL}/wishlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameReviewId }),
    });

    navigate("/wishlist");
  }

  function handleEdit() {
    setEditingReview(true);
  }

  // async function handlShare(){
  //to try later
  // }

  return (
    <main className="mx-auto w-full max-w-2xl">
      {user && review && user.id === review.userId ? (
        <>
          <section>
            {editingReview ? (
              <ReviewCardEdit
                review={review}
                updateReview={setReview}
                handleView={setEditingReview}
              />
            ) : (
              <ReviewCard review={review} />
            )}
          </section>

          <section className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => addToWishlist(review.id)}
              className="rounded-md border border-(--border) px-4 py-2 text-sm font-medium transition hover:text-(--text-h)"
            >
              Want to Play
            </button>

            <button
              onClick={handleLike}
              className="rounded-md border border-(--border) p-2 text-lg transition hover:text-(--text-h)"
            >
              <TiHeart />
            </button>

            <button className="rounded-md border border-(--border) p-2 text-lg transition hover:text-(--text-h)">
              <BiSolidDislike />
            </button>

            <br />

            <button
              onClick={handleEdit}
              className="rounded-md bg-(--accent) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Edit
            </button>

            <button
              onClick={deleteReview}
              className="rounded-md border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
            >
              Delete
            </button>
          </section>
        </>
      ) : (
        <>
          <section>

            <ReviewCard review={review} />
          </section>
          <section className="mt-4 flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`rounded-md border border-(--border) p-2 text-lg transition hover:text-(--text-h)
  ${reaction === "Like" ? "text-white-500" : ""}`}
            >
              <TiHeart /> {getLikes(review)}
            </button>
            <button
              onClick={handleDislike}
              className={`rounded-md border border-(--border) p-2 text-lg transition hover:text-(--text-h)  ${reaction === "Dislike" ? "text-white-500" : ""}`}
            >
              {getDislikes(review)}
              <BiSolidDislike />
            </button>

             {user && (
              <button
                onClick={() => addToWishlist(review.id)}
                className="mb-4 rounded-md border border-(--border) px-4 py-2 text-sm font-medium transition hover:text-(--text-h)"
              >
                Add to wishlist
              </button>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default ReviewPage;

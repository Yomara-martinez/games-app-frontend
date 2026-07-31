import { useState, useEffect } from "react";
import { Link } from "react";

function ReviewCard({ review }) {
  if (!review) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{review.title} </h1>
      <div>Duration: {review.duration}h </div>
      <div>
        Genre: {review.genre} Rating: {review.rating}/5{" "}
      </div>
      {review.description}
    </div>
  );
}

export default ReviewCard;

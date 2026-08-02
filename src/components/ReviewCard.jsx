import { useState, useEffect } from "react";
import { Link } from "react";
import { GiBeveledStar } from "react-icons/gi";
import Rating from "./Rating";

function ReviewCard({ review }) {
  if (!review) {
    return <p>Loading...</p>;
  }



  return (
    <div className='rounded-xl border border-(--border) p-5 shadow-(--shadow) transition hover:border-(--accent) mt-10'>
      <h1 className='text-xl font-semibold text-(--text-h)'>{review.title} </h1>
      <div className='mt-1 text-sm'>Duration: {review.duration}h </div>
      <div className='mt-1 text-sm'>
        Genre: {review.genre} 
        <Rating rating= {review.rating}/>
      </div>
      <p className='mt-3 text-sm'>{review.description}</p>
    </div>
  );
}

export default ReviewCard;
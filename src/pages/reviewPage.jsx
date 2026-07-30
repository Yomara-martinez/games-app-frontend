import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewCard from "../components/ReviewCard";
import CreateReview from "./createReview";
import EditReview from "../components/EditReview";

function ReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [copied, setCopied] = useState(false); //to share the review
  const [editingReview, setEditingReview] = useState(false);

  useEffect(() => {
    async function getReview() {
      const API_URL = "http://localhost:8080";
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();

      setReview(data);
    }
    getReview();
  }, []);

  function handleEdit() {
    setEditingReview(true);
    console.log(review);
  }

  //   async function handlShare(){
  //try later
  //   }
  return (
    <main>
      {editingReview && <EditReview review={review} updateReview={setReview} handleView={setEditingReview}/>}
      <section>
        <ReviewCard review={review} />
      </section>

      <section>
        <button>Like</button> <button>Dislike</button>
        <br />
        <button onClick={handleEdit}>Edit</button> <button>Delete</button>
      </section>
    </main>
  );
}
export default ReviewPage;

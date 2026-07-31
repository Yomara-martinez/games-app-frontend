import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReviewCard from "../components/ReviewCard";
import CreateReview from "./createReview";
import EditReview from "../components/EditReview";
import ReviewCardEdit from "../components/ReviewCardEdit";
import {useNavigate} from "react-router"



function ReviewPage() {
  const navigate = useNavigate()
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

  
async function deleteReview(){
         const API_URL = "http://localhost:8080";
      const response = await fetch(`${API_URL}/${id}/delete`, {
        method:"DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete Review");
      }
      navigate(`/`)
      }
      
      
    
    

  function handleEdit() {
    setEditingReview(true);
    console.log(review);
  }


  //   async function handlShare(){
  //try later
  //   }
  return (
    <main>
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

      <section>
        <button>Like</button> <button>Dislike</button>
        <br />
        <button onClick={handleEdit}>Edit</button> <button onClick={deleteReview}>Delete</button>
      </section>
    </main>
  );
}
export default ReviewPage;

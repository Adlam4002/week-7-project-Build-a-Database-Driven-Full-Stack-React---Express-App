import { useEffect, useState } from "react";
import Review from "../components/Review";

export default function Posts() {
  const [reviews, setReviews] = useState([]);
  //  need state to save the values of posts
  // need useEffect to fetch the data
  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("http://localhost:8081/review-list");
      const reviewData = await response.json();
      setReviews(reviewData);
      console.log(reviews);
    }
    fetchReviews();
  }, []);
  // function to get the posts
  // function is async and uses fetch
  // once you fetch the data, you will set the state variable to bne the posts data
  return (
    <>
      <h1>Posts</h1>
      {reviews.map((item) => {
        return (
          <Review
            key={item.review_id}
            username={item.username}
            anime_name={item.anime_name}
            comment={item.comment}
            score={item.score}
          />
        );
      })}
    </>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Review from "../components/Review";
import PostFilter from "../components/PostFilter";

export default function Posts() {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch("http://localhost:8081/review-list");
      const reviewData = await response.json();
      setReviews(reviewData);
    }
    fetchReviews();
  }, [searchParams]);
  const filteredReviews = reviews.filter((review) => {
    if (!searchParams.has("filter")) {
      return true;
    }
    return review.anime_name === searchParams.get("filter");
  });
  return (
    <>
      <PostFilter />
      <h1>Posts</h1>
      {filteredReviews.map((item) => {
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

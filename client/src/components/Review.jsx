export default function Review({
  review_id,
  username,
  comment,
  score,
  anime_name,
}) {
  return (
    <>
      <div id="review-box" key={review_id}>
        <h4 id="review-username">User: {username}</h4>{" "}
        <h4 id="review-aname">{anime_name}</h4>{" "}
        <h4 id="review-score">Score: {score}/5</h4>{" "}
        <p id="review-comment">Review: {comment}</p>
      </div>
    </>
  );
}

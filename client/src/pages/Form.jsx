import { useState, useEffect } from "react";
import AnimeForm from "../components/AnimeForm";
export default function Form() {
  const [formValues, setFormValues] = useState({
    username: "",
    comment: "",
    anime_id: "",
    score: "",
    anime_name: "",
  });
  function resetForm() {
    setFormValues({
      username: "",
      comment: "",
      anime_id: "",
      score: "",
      anime_name: "",
    });
  }
  const [animes, setAnimes] = useState([]);
  async function handleSubmit() {
    event.preventDefault();
    try {
      const check = await fetch(
        "https://week-7-project-server.onrender.com/newreview",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      const data = await check.json();
      if (data.success) {
        console.log("Review submitted");
        console.log(formValues);
        resetForm();
      }
    } catch (error) {
      console.error("Error.error");
    }
  }
  function handleInputChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch(
        "https://week-7-project-server.onrender.com/anime-list"
      );
      const animes = await response.json();
      setAnimes(animes);
    }
    fetchAnime();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          id="username-input"
          placeholder="Write your name"
          required
        />
        <label htmlFor="comment">Your review:</label>
        <input
          type="text"
          name="comment"
          value={formValues.comment}
          onChange={handleInputChange}
          id="comment-input"
          placeholder="Write your review"
          required
        />{" "}
        <label htmlFor="anime_id"> Which anime?</label>
        <select
          name="anime_id"
          id="anime_id-input"
          value={formValues.anime_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select...</option>
          {animes.map((item) => (
            <option key={item.anime_id} value={item.anime_id}>
              {item.anime_name}
            </option>
          ))}
        </select>
        <label htmlFor="score"> Rating out of 5:</label>
        <select
          name="score"
          id="score-input"
          onChange={handleInputChange}
          value={formValues.score}
          required
        >
          <option value="">Select...</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h3>Review preview</h3>
      <div id="review-box">
        <h4 id="review-username">User: {formValues.username}</h4>{" "}
        <h4 id="review-aname">{formValues.anime_name}</h4>{" "}
        <h4 id="review-score">Score: {formValues.score}/5</h4>{" "}
        <p id="review-comment">Review: {formValues.comment}</p>
      </div>
      <AnimeForm />{" "}
    </>
  );
}

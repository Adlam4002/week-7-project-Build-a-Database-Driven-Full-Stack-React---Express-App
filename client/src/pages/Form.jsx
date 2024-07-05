import { useState, useEffect } from "react";
import AnimeForm from "../components/AnimeForm";
export default function Form() {
  const [formValues, setFormValues] = useState({
    username: "",
    comment: "",
    anime_name: "",
    score: "",
  });
  function resetForm() {
    setFormValues({
      username: "",
      comment: "",
      anime_name: "",
      score: "",
    });
  }
  const [animes, setAnimes] = useState([]);
  async function handleSubmit() {
    event.preventDefault();
    // const formData = new FormData(formValues);
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
  // have an on change so the comments will be previewed, handle the change of user input
  // the key is the target name, the value is the target value
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
        <label htmlFor="anime_name"> Which anime?</label>
        <select
          name="anime_name"
          id="anime_name-input"
          value={formValues.anime_name}
          onChange={handleInputChange}
          required
        >
          {animes.map((item) => (
            <option key={item.anime_id} value={item.anime_name}>
              {item.anime_name}
            </option>
          ))}
          {/* <option value="Mashle: Magic and Muscles">
            Mashle: Magic and Muscles
          </option>
          <option value="Attack on Titan">Attack on Titan</option>
          <option value="Jujutsu Kaisen">Jujutsu Kaisen</option>
          <option value="Demon Slayer">Demon Slayer</option>
          <option value="Chainsaw Man">Chainsaw Man</option> */}
        </select>
        <label htmlFor="score"> Rating out of 5:</label>
        <select
          name="score"
          id="score-input"
          onChange={handleInputChange}
          value={formValues.score}
          required
        >
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
  //   need two events, one to submit and one to track changes
}

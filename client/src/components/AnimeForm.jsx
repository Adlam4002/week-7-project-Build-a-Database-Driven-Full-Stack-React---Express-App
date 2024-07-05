import { useState } from "react";

export default function AnimeForm() {
  const [show, setShow] = useState(false);
  const [anime_name, setAnime_Name] = useState({
    anime_name: "",
  });
  async function handleSubmit() {
    event.preventDefault();
    try {
      const check = await fetch("http://localhost:8081/newanime", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anime_name),
      });
      const data = await check.json();
      if (data.success) {
        console.log("Title submitted");
      }
    } catch (error) {
      console.error("Error.error");
    }
  }
  const handleInputChange = (event) => {
    setAnime_Name({ anime_name: event.target.value });
  };
  return (
    <>
      <button onClick={() => setShow(!show)}>Submit a new anime</button>
      {show ? (
        <>
          <h2>Your submission: {anime_name.anime_name}</h2>
          <form onSubmit={handleSubmit} id="newForm">
            <label htmlFor="anime_name">Anime name:</label>
            <input
              type="text"
              name="anime_name"
              value={anime_name.anime_name}
              onChange={handleInputChange}
              id="anime_name-input"
              placeholder="Write the title of thew new anime"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : null}
    </>
  );
}

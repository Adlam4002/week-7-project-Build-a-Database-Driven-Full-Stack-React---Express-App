import { useState, useEffect } from "react";
export default function CategoryLinks() {
  const [animes, setAnimes] = useState([]);
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
      <div id="cat-links">
        {animes.map((item) => {
          return (
            <a
              key={item.anime_id}
              href={`https://week-7-project-server.onrender.com/reviews/${item.anime_name}`}
            >
              {" "}
              {item.anime_name}{" "}
            </a>
          );
        })}
      </div>
    </>
  );
}

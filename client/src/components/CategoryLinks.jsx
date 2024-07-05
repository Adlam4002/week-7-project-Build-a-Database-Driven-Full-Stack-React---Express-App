import { useState, useEffect } from "react";
export default function CategoryLinks() {
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch("http://localhost:8081/anime-list");
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
              href={`http://localhost:8081/reviews/${item.anime_name}`}
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

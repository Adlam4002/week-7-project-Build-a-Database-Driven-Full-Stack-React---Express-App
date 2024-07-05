import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function PostFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch("http://localhost:8081/anime-list");
      const animes = await response.json();
      setAnimes(animes);
    }
    fetchAnime();
  }, [searchParams]);
  function handleFilter(animeName) {
    setSearchParams({ filter: animeName });
  }

  return (
    <>
      <div id="cat-links">
        {animes.map((item) => (
          <button
            key={item.anime_id}
            onClick={() => handleFilter(item.anime_name)}
          >
            {item.anime_name}
          </button>
        ))}
        <button onClick={() => setSearchParams({})}>Clear Filter</button>{" "}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import SearchInput from "./components/searchInput";
import svgLogo from "./assets/svgLogo.svg";

import styles from "./app.module.scss";

type AnimeData = {
  id: number;
  attributes: {
    titles: {
      en: string;
      ja_jp: string;
    };
    posterImage: {
      small: string;
    };
  };
};

function App() {
  const [info, setInfo] = useState<{ data: AnimeData[] }>({ data: [] });
  const [text, setText] = useState("");

  const baseURL = "https://kitsu.io/api/edge/";

  useEffect(() => {
    fetch(`${baseURL}anime`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, []);

  useEffect(() => {
    if (text) {
      fetch(`${baseURL}anime?filter[text]=${text}`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.mainNavbar}>
          <img src={svgLogo} alt="" />
          <SearchInput value={text} onChange={(str) => setText(str)} />
        </div>
      </nav>
      <div className={styles.mainImgs}>
        {info.data && (
          <ul className={styles.listaAnime}>
            {info.data.map((anime) => (
              <ul className={styles.itemAnime} key={anime.id}>
                <h2>
                  {anime.attributes.titles.en
                    ? anime.attributes.titles.en
                    : "(Sem Titulo!)"}
                </h2>
                <img
                  src={anime.attributes.posterImage.small}
                  alt={anime.attributes.titles.en}
                />
              </ul>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

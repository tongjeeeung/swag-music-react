import { FC, useEffect, useRef, useState } from "react";
import styles from "./search.module.css";
import {
  SearchUIProps,
  SearchFunction,
  CachedFunction,
  SearchResult,
} from "./type";
import { useNavigate, useLocation } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const SearchUI: FC<SearchUIProps> = ({ artists, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const triggerRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [parent] = useAutoAnimate<HTMLUListElement>(popupRef);

  const searchValues: SearchFunction = (searchElement: string) => {
    const results: SearchResult[] = [];
    const upperSearch = searchElement.toUpperCase();

    artists.forEach((artist) => {
      // Поиск движения по артистам
      if (artist.name.toUpperCase().startsWith(upperSearch)) {
        results.push({ type: "executor", name: artist.name, id: artist._id });
      }

      artist.playlists.forEach((playlist) => {
        // Поиск по плейлистам
        if (playlist.name.toUpperCase().startsWith(upperSearch)) {
          results.push({
            type: "playlists",
            name: playlist.name,
            id: playlist._id,
          });
        }

        playlist.tracks.forEach((track) => {
          // Поиск по трекам
          if (track.name.toUpperCase().startsWith(upperSearch)) {
            results.push({
              type: "track",
              name: track.name,
              id: track._id,
              albumId: playlist._id,
            });
          }
        });
      });
    });

    return results;
  };

  const cacheFunction = (fn: SearchFunction): CachedFunction => {
    const cache: Record<string, SearchResult[]> = {};

    return (n: string) => {
      if (cache[n]) return cache[n]; // Возвращаем кэшированные результаты
      const result = fn(n);
      cache[n] = result; // Кэшируем результаты
      return result;
    };
  };

  const fnSearch = cacheFunction(searchValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      setIsPopupVisible(false);
    } else {
      const valueSearch = fnSearch(value).slice(0, 8);
      setFilteredResults(valueSearch);
      setIsPopupVisible(true);
    }
  };

  const handleItemClick = (
    value: string,
    id: string,
    type: string,
    albumId?: string,
  ) => {
    setSearchTerm(value);
    setIsPopupVisible(false);
    triggerRef.current?.focus(); // безусловное использование focus

    handleSearch(); // Вызов функции поиска

    const state = { background: location };

    if (type === "executor") {
      navigate(`/swag-music-react/${type}/${id}`);
    } else {
      navigate(`/swag-music-react/playlists/${albumId}`, { state });
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      !popupRef.current?.contains(e.target as Node) &&
      !triggerRef.current?.contains(e.target as Node)
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <form className={styles.search}>
        <input
          className={styles.input}
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsPopupVisible((prev) => !prev)}
          placeholder="Search"
          ref={triggerRef}
        />
      </form>
      {isPopupVisible && searchTerm.trim() !== "" && (
        <ul className={styles.dropdown} ref={parent}>
          {filteredResults.map((result) => (
            <li
              key={result.id}
              className={styles.item}
              onClick={() =>
                handleItemClick(
                  result.name,
                  result.id,
                  result.type,
                  result.albumId,
                )
              }
            >
              <h2 className={styles.value}>{result.name}</h2>
              <h3 className={styles.as}>
                {result.type === "executor" && "executor"}
                {result.type === "playlists" && "playlist"}
                {result.type === "track" && "track"}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

import { FC, useEffect, useRef, useState } from "react";
import styles from './search.module.css';
import { SearchUIProps, SearchFunction, CachedFunction, SearchResult } from "./type";
import { useNavigate, useLocation } from "react-router-dom";

export const SearchUI: FC<SearchUIProps> = ({artists, handleSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const triggerRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchValues: SearchFunction = (searchElement) => {
    const results: SearchResult[] = [];

    artists.forEach((artist) => {
      if (artist.name.toUpperCase().startsWith(searchElement.toUpperCase())) {
        results.push({ type: 'executor', name: artist.name, id: artist._id });
      }

      artist.playlists.forEach((playlist) => {
        if (playlist.name.toUpperCase().startsWith(searchElement.toUpperCase())) {
          results.push({ type: 'playlists', name: playlist.name, id: playlist._id });
        }

        playlist.tracks.forEach((track) => {
          if (track.name.toUpperCase().startsWith(searchElement.toUpperCase())) {
            results.push({ type: 'track', name: track.name, id: track._id, albumId: playlist._id });
          }
        });
      });
    });

    return results;
  };

  const cashFunction = (fn: SearchFunction): CachedFunction => {
    const cache: Record<string, SearchResult[]> = {};
    return function (n: string) {
      if (cache[n]) {
        return cache[n];
      }
      const result = fn(n);
      cache[n] = result;
      return result;
    };
  };

  const fnSearch = cashFunction(searchValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredResults([]);
      setIsPopupVisible(false);
    } else {
      const valueSearch = fnSearch(value).slice(0, 8);
      setFilteredResults(valueSearch);
      setIsPopupVisible(true);
    }
  };

  const handleItemClick = (value: string, id: string, type: string, albumId?: string) => {
    setSearchTerm(value);
    setIsPopupVisible(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
    
    handleSearch()

    const state = { background: location };

    if (type === 'executor') {
      navigate(`/swag-music-react/${type}/${id}`);
    } else {
      navigate(`/swag-music-react/playlists/${albumId}`, { state });
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      popupRef.current &&
      triggerRef.current &&
      !popupRef.current.contains(e.target as Node) &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (<>
  <form className={styles.search}>
    <input className={styles.input} type="search" value={searchTerm} onChange={handleInputChange} onClick={() => setIsPopupVisible(!isPopupVisible)} placeholder="Search" ref={triggerRef}></input>
  </form>
  {isPopupVisible && searchTerm.trim() !== '' && (<ul className={styles.dropdown} ref={popupRef}>
    {filteredResults.map((result) => (
      <li key={result.id} className={styles.item} onClick={() => handleItemClick(result.name, result.id, result.type, result.albumId)}>
        <h2 className={styles.value}>{result.name}</h2>
        <h3 className={styles.as}>
          {result.type === 'executor' && `executor`}
          {result.type === 'playlists' && `playlist`}
          {result.type === 'track' && `track`}
        </h3>
      </li>
    ))}
  </ul>)}
</>)}
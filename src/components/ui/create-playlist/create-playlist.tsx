import { FC, useEffect, useRef, useState } from "react";
import styles from './create-playlist.module.css';
import { CachedFunction, CreateIUProps, SearchFunction } from "./type";
import { TTrack } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

export const CreatePlaylistUI: FC<CreateIUProps> = ({
  name,
  setName,
  handleSubmit,
  info,
  setInfo,
  tracks,
  setSelectedTracks,
  selectedTracks,
  image,
  setImage,
  handleDeletePlaylist,
  id
}) => {
  const [localErrors, setLocalErrors] = useState<{ name?: string; info?: string }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<TTrack[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const triggerRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const validateName = (name: string) => {
    if (name.length < 2 || name.length > 16) {
      return 'Имя должно быть не меньше 2 символов и не больше 16';
    }
    return '';
  };

  const validateInfo = (info: string) => {
    if (info.length > 100) {
      return 'Информация не должна превышать 100 символов';
    }
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setLocalErrors((prevErrors) => ({ ...prevErrors, name: validateName(newName) }));
  };

  const handleInformationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInfo = e.target.value;
    setInfo(newInfo);
    setLocalErrors((prevErrors) => ({ ...prevErrors, info: validateInfo(newInfo) }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameError = validateName(name);
    const infoError = validateInfo(info);

    if (nameError || infoError) {
      setLocalErrors({ name: nameError, info: infoError });
    } else {
      handleSubmit(e);
    }
  };

  const searchValues: SearchFunction = (searchElement) => {
    return tracks.filter(
      (track) =>
        track.name.toUpperCase().startsWith(searchElement.toUpperCase()) &&
        !selectedTracks.some((selectedTrack) => selectedTrack._id === track._id)
    );
  };

  const cashFunction = (fn: SearchFunction): CachedFunction => {
    const cache: Record<string, TTrack[]> = {};
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
      const valueSearch = fnSearch(value).slice(0, 5);
      setFilteredResults(valueSearch);
      setIsPopupVisible(true);
    }
  };

  const handleItemClick = (track: TTrack) => {
    setSelectedTracks([...selectedTracks, track]);
    setSearchTerm('');
    setIsPopupVisible(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const handleDeleteButton = (track: TTrack) => {
    setSelectedTracks(selectedTracks.filter((_track) => _track._id !== track._id));
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    else if(typeof e.target.value === 'string') {
      setImage(e.target.value);
    }
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <form className={styles.create} onSubmit={(e) => handleFormSubmit(e)}>
      <div className={styles.header}>
        {image ? (
          <img className={styles.image} src={typeof image === "string" ? image : URL.createObjectURL(image)} alt="Playlist" onClick={() => setImage('')} />
        ) : (
          //<div className={styles.input_img_wrapper}>
            <input className={styles.input} type="text" placeholder="Link" onChange={handleImageChange} />
            //<span className={styles.input_img_text}>Выберите файл</span>
          //</div>
        )}
        <div className={styles.form}>
          <input
            className={styles.input}
            style={localErrors.name ? { margin: '0' } : {}}
            placeholder="Name"
            type="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          {localErrors.name && <span className={styles.error}>{localErrors.name}</span>}
          <textarea
            className={`${styles.input} ${styles.area}`}
            style={localErrors.info ? { margin: '0' } : {}}
            placeholder="Information"
            name="information"
            value={info}
            onChange={handleInformationChange}
          />
          {localErrors.info && <span className={styles.error}>{localErrors.info}</span>}
        </div>
      </div>
      <div className={styles.search}>
        <input
          className={styles.search_input}
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsPopupVisible(!isPopupVisible)}
          placeholder="Search"
          ref={triggerRef}
        />
      </div>
      {isPopupVisible && searchTerm.trim() !== '' && (
        <ul className={styles.dropdown} ref={popupRef}>
          {filteredResults.map((result) => (
            <li key={result._id} className={styles.item} onClick={() => handleItemClick(result)}>
              <h3 className={styles.executor}>{result.executor}</h3>
              <span>-</span>
              <h4 className={styles.name}>{result.name}</h4>
              <span className={styles.time}>{result.duration}</span>
            </li>
          ))}
        </ul>
      )}
      <h2 className={styles.title}>Tracks</h2>
      <ul className={styles.addedTracks}>
        {selectedTracks.map((track) => (
          <li key={track._id} className={styles.track}>
            <h3 className={styles.executor}>{track.executor}</h3>
            <span>-</span>
            <h4 className={styles.name}>{track.name}</h4>
            <span className={styles.time}>{track.duration}</span>
            <button className={styles.delete} onClick={() => handleDeleteButton(track)}>X</button>
          </li>
        ))}
      </ul>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={handleCancelClick}>Cancel</button>
        {id ? (<button className={styles.cancel} onClick={handleDeletePlaylist}>Delete</button>) : ('')}
        <button className={styles.add} type="submit" disabled={selectedTracks.length === 0 || !image}>Create</button>
      </div>
    </form>
  );
};
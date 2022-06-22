import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Location from './Location';
import header from '../images/header.png';
import '../styles/styles.css';

const InputLocation = () => {
  const [generalLocation, setGeneralLocation] = useState([]);
  const [inputLocation, setinputLocation] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [episodes, setEpisodes] = useState([]);

  const setLocationsArray = () => {
    const locationArray = [];
    for (let i = 1; i <= 126; i++) {
      locationArray.push(i);
    }
    return locationArray;
  }

  const setEpisodesArray = () => {
    const episodesArray = [];
    for (let i = 1; i <= 51; i++) {
      episodesArray.push(i);
    }
    return episodesArray;
  }




  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/${setLocationsArray()}`)
      .then(res => setGeneralLocation(res.data));

    axios.get(`https://rickandmortyapi.com/api/episode/${setEpisodesArray()}`)
      .then(res => setEpisodes(res.data));
  }, []);

  const onSuggestHandler = text => {
    axios.get(`https://rickandmortyapi.com/api/location/?name=${text}`)
      .then(res => setinputLocation(res.data.results))
    setText('')
    setSuggestions([])
  }
  //!CAMBIOS ACA
  const onEpisodeHandler = id => {
    axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then(res => setinputLocation(res.data))
    setText('')
    setSuggestions([])
  }

  const onChangeHandler = text => {
    let matches = [];
    if (text.length > 0) {
      matches = generalLocation.filter(location => {
        const regex = new RegExp(`${text}`, 'gi');
        return location.name.match(regex);
      })
    }
    setSuggestions(matches);
    setText(text);
  }

  const orderEpisodes = episodes => {
    const seasons = [
      [], [], [], [], []
    ];

    episodes.forEach(episode => {
      if (episode.episode.includes('S01')) seasons[0].push(episode.id + ' -> ' + episode.episode + ' - ' + episode.name);
      else if (episode.episode.includes('S02')) seasons[1].push(episode.id + ' -> ' + episode.episode + ' - ' + episode.name);
      else if (episode.episode.includes('S03')) seasons[2].push(episode.id + ' -> ' + episode.episode + ' - ' + episode.name);
      else if (episode.episode.includes('S04')) seasons[3].push(episode.id + ' -> ' + episode.episode + ' - ' + episode.name);
      else /*if (episode.episode.includes('S05')) */ seasons[4].push(episode.id + ' -> ' + episode.episode + ' - ' + episode.name);
    })

    const getId = text => {
      const newText = text.slice(0, 2);
      return newText;
    }

    return (
      <>
        <optgroup label='Season 1'>
          {seasons[0].map(season => (
            <option value={getId(season)}>{season}</option>
          ))}
        </optgroup>
        <optgroup label='Season 2'>
          {seasons[1].map(season => (
            <option value={getId(season)}>{season}</option>
          ))}
        </optgroup>

        <optgroup label='Season 3'>
          {seasons[2].map(season => (
            <option value={getId(season)}>{season}</option>
          ))}
        </optgroup>

        <optgroup label='Season 4'>
          {seasons[3].map(season => (
            <option value={getId(season)}>{season}</option>
          ))}
        </optgroup>

        <optgroup label='Season 5'>
          {seasons[4].map(season => (
            <option value={getId(season)}>{season}</option>
          ))}
        </optgroup>
      </>
    )
  }

  return (
    <>
      <img className='header-img' src={header} alt="img" />
      <h1>Rick and Morty Wiki</h1>
      <div className="filters-container">
        <select onChange={e => onSuggestHandler(e.target.value)} className='first-select'>
          <option>Select location</option>
          {
            generalLocation?.map(location => (
              <option value={location.name}>Location {location.id}</option>
            ))
          }
        </select>

        <div className='search-input'>
          <input onBlur={() => {
            setTimeout(() => setSuggestions([]), 100); /* sin el timeout al darle click al elemento no se seteará en el input */
          }}
            className='suggestions-input' placeholder='Type a location name' onChange={e => onChangeHandler(e.target.value)} value={text} />
          <ul className='suggestions-ul'>
            {suggestions && suggestions.map(suggestion =>
              <li onClick={() => onSuggestHandler(suggestion.name)}
                key={suggestion.id} className='suggestions'>{suggestion.name}</li>
            )}
          </ul>
        </div>

        <select onChange={e => onEpisodeHandler(e.target.value)} className='second-select'>
          <option>Select episode</option>
          {
            orderEpisodes(episodes)
          }
        </select>
      </div>
      {/* <button className='search-button' onClick={getLocation}>Search</button> */}
      <Location location={inputLocation?.[0] ? inputLocation?.[0] : inputLocation} />
    </>
  );
};

export default InputLocation;
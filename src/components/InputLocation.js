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
    
    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/location`)
        .then(res=>setGeneralLocation(res.data))
      },[]);

    const onSuggestHandler = text =>{
        axios.get(`https://rickandmortyapi.com/api/location/?name=${text}`)
        .then(res=>setinputLocation(res.data.results))
        setText('')
        setSuggestions([])
    }

    const onChangeHandler=text=>{
        let matches = [];
        if (text.length>0) {
          matches = generalLocation.results.filter(location=>{
            const regex = new RegExp(`${text}`, 'gi');
            return location.name.match(regex);
          })
        }
        setSuggestions(matches);
        setText(text);
    }

    return (
        <>
         <img className='header-img' src={header} alt="img" />
          <h1>Rick and Morty Wiki</h1> 

        
            <div className='search-input'>
              <input onBlur={()=>{
                  setTimeout(() => setSuggestions([]), 100); /* sin el timeout al darle click al elemento no se seteará en el input */
              }}
              className='suggestions-input' placeholder='Type a location name' onChange={e=>onChangeHandler(e.target.value)} value={text}/>
              <ul className='suggestions-ul'>
                {suggestions && suggestions.map(suggestion=>
                <li onClick={()=>onSuggestHandler(suggestion.name)}
                key={suggestion.id} className='suggestions'>{suggestion.name}</li>
                )} 
              </ul>
            </div>
            {/* <button className='search-button' onClick={getLocation}>Search</button> */}
                <Location location={inputLocation?.[0]}/>
                
            
        </>          
    );
};

export default InputLocation;
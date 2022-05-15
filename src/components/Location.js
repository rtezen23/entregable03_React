import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ResidentInfo from './ResidentInfo';
import notFound from '../images/notFound.gif';

const Location = ({location}) => {

    const [searchLocation, setSearchLocation] = useState([]);

    useEffect(()=>{
      if (location?.residents) setSearchLocation(location);
    },[location]);
    
    useEffect(()=>{
      const random = 1 + Math.floor(Math.random()*126);
      axios.get(`https://rickandmortyapi.com/api/location/${random}`)
      .then(res=>setSearchLocation(res.data))
    },[]);

    return (
        <main>
          <div className='container__info'>
            <h2 className='info-name'> Name: {searchLocation.name} </h2>
            <div className='info-data'>
              <p> Type: {searchLocation.type} </p>
              <p> Dimension: {searchLocation.dimension} </p>
              <p> Population: {searchLocation.residents?.length} </p>
            </div>
          </div> 
          <h2 className='h2-residents'>Residents</h2>
          <ul className='container-location'>
            {
            searchLocation.residents?.length>0?  
            searchLocation.residents?.map(location=>(
              <ResidentInfo key={location} url={location}/>
            )):(
              <div className='notFound'>
                <img src={notFound} alt="" srcset="" />
                <h2>There are no population in this location</h2>
              </div>
            )
            }
          </ul>
        </main>
    );
};

export default Location;
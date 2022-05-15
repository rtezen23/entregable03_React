import axios from 'axios';
import React, { useEffect, useState } from 'react';


const ResidentInfo = ({url}) => {
    
    const [resident, setResident] = useState({});

    useEffect(()=>{
      axios.get(url).then(res=>setResident(res.data));
    },[url]);

    return (
            <li className='resident-container'>
              <img className='resident-img' src={resident.image} alt="" />
              <div className='resident-info'>
                <h4>{resident.name}</h4>
                <hr className='rule'/>
                <p> {resident.status} - {resident.species} </p>
                <p><span>Origin:</span> {resident.origin?.name}</p>
                <p><span>Episodes where appear:</span> {resident.episode?.length}</p>
              </div>
            </li>
    );
};

export default ResidentInfo;
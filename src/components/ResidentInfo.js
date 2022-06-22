import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ResidentInfo = ({ url }) => {

  const [resident, setResident] = useState({});

  useEffect(() => {
    axios.get(url).then(res => setResident(res.data));
  }, [url]);

  const chooseStyle = status => {
    const statusObj = {
      Dead: 'red',
      unknown: 'gray',
      Alive: 'green'
    }
    return { backgroundColor: `${statusObj[status]}` };
  }

  /* <div className="lds-ring"><div></div><div></div><div></div><div></div></div> */

  return (
    <li className='resident-container'>
      <div className="resident-status"><div style={chooseStyle(resident.status)}></div> {resident.status}</div>

      <img className='resident-img' src={resident.image} alt="" />
      <div className='resident-info'>
        <h4>{resident.name}</h4>
        <hr className='rule' />
        <p>{resident.species} </p>
        <p><span>Origin:</span> {resident.origin?.name}</p>
        <p><span>Episodes where appear:</span> {resident.episode?.length}</p>
      </div>
    </li>
  );
};

export default ResidentInfo;
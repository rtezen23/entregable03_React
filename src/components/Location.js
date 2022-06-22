import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ResidentInfo from './ResidentInfo';
import notFound from '../images/notFound.gif';
import Pagination from './Pagination';

const Location = ({ location }) => {

  const [searchLocation, setSearchLocation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    if (location?.residents) setSearchLocation(location);
    else if (location?.characters) setSearchLocation(location);
  }, [location]); //!CAMBIOS ACA

  useEffect(() => {
    const random = 1 + Math.floor(Math.random() * 126);
    axios.get(`https://rickandmortyapi.com/api/location/${random}`)
      .then(res => setSearchLocation(res.data))
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchLocation.characters ? searchLocation.characters?.slice(indexOfFirstPost, indexOfLastPost) : searchLocation.residents?.slice(indexOfFirstPost, indexOfLastPost);
  //!CAMBIO
  //Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  //!CAMBIO
  const condition = () => {
    if (searchLocation.residents?.length > 0 || searchLocation.characters?.length > 0) {
      if (currentPosts?.length === 0) {
        setCurrentPage(1);
      }
      return (
        currentPosts?.map(location => (
          <ResidentInfo key={location} url={location} />
        ))
      )
    } else {
      return (
        <div className='notFound'>
          <img src={notFound} alt="" />
          <h2>There are no residents in this location</h2>
        </div>
      )
    }
  }

  return (
    <main>
      <div className='container__info'>
        <h2 className='info-name'> {searchLocation.residents ? "Location's" : "Episode's"} name: {searchLocation.name} </h2>
        <div className='info-data'>
          {searchLocation.type && <p> Type: {searchLocation.type} </p>}
          {searchLocation.dimension && <p> Dimension: {searchLocation.dimension} </p>}
          {searchLocation.residents && <p> Population: {searchLocation.residents?.length} </p>}
        </div>
      </div>
      <h2 className='h2-residents'>{searchLocation.residents ? 'Residents' : 'Characters'} </h2>
      <ul className='container-location'>
        <>
          {condition()}
        </>
        {/*  {
            currentPosts?.length>0?
              currentPosts?.map(location=>(
              <ResidentInfo key={location} url={location}/>
            )):(
              <div className='notFound'>
                <img src={notFound} alt=""/>
                <h2>There are no population in this location</h2>
              </div>
            )} */}
      </ul>
      <Pagination postsPerPage={postsPerPage} totalPosts={searchLocation.residents ? searchLocation.residents?.length : searchLocation.characters?.length} paginate={paginate} />
    </main>
  );
};

export default Location;
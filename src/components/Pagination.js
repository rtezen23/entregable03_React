import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='pagination-container'>
            {pageNumbers.map(number=>(
                <a key={number} onClick={()=> paginate(number)} href="#!" className='pagination-item'>
                    <li>
                        {number}
                    </li>
                </a>
            ))}
        </ul>
    );
};

export default Pagination;
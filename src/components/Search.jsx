import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
  return (
    
    <div className='seaech'>
      <h3>Search</h3>
      <input type="text" value={search} placeholder='Search' onChange={handleSearch} ref={searchInput}/>
    </div>
    
  )
}

export {Search}

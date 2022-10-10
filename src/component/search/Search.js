import React from 'react'
import './../../styles/Component/Search.css'
import { BiSearchAlt } from 'react-icons/bi'

const Search = ({ value, onChange }) => {
  return (
    <div className='search'>
        <BiSearchAlt size={18} className='icon'/>

        <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
      />
        
    </div>
  );
}

export default Search;
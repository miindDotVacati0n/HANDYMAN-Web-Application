import React from 'react'
import LoaderImg from './../assets/Loading.gif'
import './../styles/Loader.css'

const Loader = () => {
  return (
    <div className='wrapper'>
        <div className='loader'>
            <img src='LoaderImg' alt='Loading...' />
        </div>
    </div>
  )
}

export default Loader
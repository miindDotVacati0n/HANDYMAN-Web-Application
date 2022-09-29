import React from 'react'
import LoaderImg from './../assets/loader1.gif'
import './../styles/Loader.css'
import ReactDom from 'react-dom'

const Loader = () => {
  return ReactDom.createPortal (
    <div className='wrapper'>
        <div className='loader'>
            <img src={LoaderImg} alt='Loading...' />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

export default Loader
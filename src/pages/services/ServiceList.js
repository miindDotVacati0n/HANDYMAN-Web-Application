import React, { useEffect, useState } from 'react'
import './../../styles/Pages/Services/ServiceList.css'
import { BsFillGridFill } from 'react-icons/bs'
import { FaList } from 'react-icons/fa'
import Search from '../../component/search/Search'
import { list } from 'firebase/storage'
import ServiceItem from './ServiceItem'
import ServiceFilter from './ServiceFilter'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilterServices } from '../../redux/slice/filterSlice'


const ServiceList = ({services}) => {

  const [grid, setGrid] = useState(true)

  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const filterServices = useSelector(selectFilterServices)

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({services, search}))
  }, [dispatch, services, search])

  return (
    <div className='service-list' id='service'>
      <h2>Service List.</h2>
      <ServiceFilter/>
      <div className='top'>
        <div className='icons'>
          <BsFillGridFill size={21} color='orangered' onClick={() => setGrid(true)} />
          {/* <FaList size={24} color='#00828c' onClick={() => setGrid(false)} /> */}

          <p>
            <b>10</b> Services found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Services */}
        <div className='sort'>
          <label>Sort by: </label>
          <select>
            <option value={'latest'}>Latest</option>
            <option value={'lowest-price'}>Lowest Price</option>
            <option value={'highest-price'}>Hightest Price</option>
            <option value={'a-z'}>A - Z</option>
            <option value={'z-a'}>Z- A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${'grid'}` : `${'list'}`}>
        {services.lenght === 0 ? (
          <p>No service found.</p>
        ) : (
          <>
          {filterServices.map((service) => {
            // const {} = service;
            return(
              <div key={service.id}>
                <ServiceItem {...service} grid={grid} service={service} />
              </div>
            )
          })}
          </>
        )}
      </div>
    </div>
  )
}

export default ServiceList
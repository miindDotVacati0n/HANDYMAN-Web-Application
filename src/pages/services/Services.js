import React, { useEffect } from 'react'
import ServiceList from './ServiceList'
import './../../styles/Pages/Services/Services.css'
import useFetchCollection from '../../component/customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectServices, STORE_SERVICES } from '../../redux/slice/serviceSlice'
import ServiceFilter from './ServiceFilter'


const Services = () => {

  const { data, loading } = useFetchCollection("services")

  const services = useSelector(selectServices)
  console.log(services)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
              STORE_SERVICES({
              services: data,
              })
            );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);


  return (
    <section>
      <div className={`container ${'service'}`}>
        
        <div className='content'>
          <ServiceList services={services}/>
        </div>
      </div>
    </section>
  )
}

export default Services
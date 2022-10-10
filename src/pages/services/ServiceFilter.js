import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectServices } from '../../redux/slice/serviceSlice'
import './../../styles/Pages/Services/ServiceFilter.css'



const ServiceFilter = () => {

    const services = useSelector(selectServices)

    const [category, setCategory] = useState("All");

    const dispatch = useDispatch();

    // const filterServices = (cat) => {
    //     setCategory(cat)
    //     dispatch()
    // }

    // const allCategories= [
    //     "All",
    //     ...new Set(services.map((service) => service.category)),
    // ];
    // console.log(allCategories)

  return (
    <div className='filter'>
        <h4>Categories</h4>
        {/* <div className='category'>
            {allCategories.map((cat, index) => {
                return(
                    <button key={index} type='button'
                    className='{`${category}` === cat ? `${"active"}` : null} onClick={() => filterServices(cat)}'>&#8250; {cat}</button>
                )
            })}
            
        </div> */}
        <button className='btn'>Clear Filter</button>
    </div>
  )
}

export default ServiceFilter
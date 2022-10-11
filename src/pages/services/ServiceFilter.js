import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_CATEGORY } from '../../redux/slice/filterSlice'
import { selectServices } from '../../redux/slice/serviceSlice'
import './../../styles/Pages/Services/ServiceFilter.css'


const ServiceFilter = () => {

    const services = useSelector(selectServices)

    const [category, setCategory] = useState("All");

    const dispatch = useDispatch();

    const filterServices = (cat) => {
        setCategory(cat);
        dispatch(FILTER_BY_CATEGORY({ services, category: cat }))
    }

    const allCategories = [
        "ทั้งหมด",
        ...new Set(services.map((service) => service.category)),
    ];
    console.log(allCategories)

    const clearFilters = () => {
        setCategory("ทั้งหมด")
        console.log("true")
    }

    return (
        <div className='filter'>
            <h4>Categories</h4>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className='category'>
                {allCategories.map((cat, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`${category}` === cat ? `${"active"}` : null}
                            onClick={() => filterServices(cat)}
                        >
                            {cat}
                        </button>
                        
                    )
                })}

            </div>

            <br/>
            <button className='btn' onClick={clearFilters}>Clear Filter</button>
        </div>
        
    )
        
}


export default ServiceFilter
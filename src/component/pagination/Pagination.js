import React, { useState } from 'react'
import './../../styles/Component/Pagination.css'

const Pagination = ({ currentPage, setCurrentPage, servicesPerPage, totalServices }) => {

    const pageNumbers = []
    const totalPages = totalServices / servicesPerPage;

    //Limit the page
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    // Pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Next page
    const paginateNext = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    // Prev page
    const paginatePrev = () => {
        setCurrentPage(currentPage - 1);
        if((currentPage - 1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className='pagination'>
            <li onClick = {paginatePrev} className={currentPage === pageNumbers[0] ? `${'hidden'}` : null}>ก่อนหน้า</li>

            {pageNumbers.map((number) => {
                if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                    return (
                        <li key={number} onClick={() => paginate(number)} className={currentPage === number ? `${'active'}` : null}>
                            {number}
                        </li>
                    )
                }

            })}


            <li onClick={paginateNext} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${'hidden'}` : null}>ถัดไป</li>
            <p>
                <b className='page'>{`หน้า ${currentPage}`}</b>
                <span>{` จาก `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>

        </ul>
    )
}

export default Pagination
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchCollection from '../../component/customHooks/useFetchCollection'


const OrderDetails = () => {

  const [order, setOrder] = useState(null)
  const {id} = useParams()
  const {document} = useFetchCollection("orders", id)

  useEffect(() => {
    setOrder(document)
  }, [document])
  
  console.log(order)

  return (
    <div>OrderDetails</div>
  )
}

export default OrderDetails
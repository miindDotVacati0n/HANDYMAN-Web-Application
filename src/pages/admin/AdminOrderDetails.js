import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChangeOrderStatus from './ChangeOrderStatus'


const AdminOrderDetails = () => {

  const [order, setOrder] = useState(null);
  const { id } = useParams();

  return (
    <div>
        <ChangeOrderStatus order={order} id={id}/>
    </div>
  )
}

export default AdminOrderDetails
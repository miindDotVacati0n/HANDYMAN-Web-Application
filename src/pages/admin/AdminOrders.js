import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchCollection from '../../component/customHooks/useFetchCollection';
import Loader from '../../component/Loader';
import { selectUserID } from '../../redux/slice/authSlice';
import { selectOrderHistory, STORE_ORDERS } from '../../redux/slice/orderSlice';
import '../../styles/Admin/AdminOrders.css'


const AdminOrders = () => {
  const {data, isLoading} = useFetchCollection('orders')
  const orders = useSelector(selectOrderHistory)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const userID = useSelector(selectUserID)

  // const filteredOrders = orders.filter((order) => order.userID === userID)

  const handleClick = (id) => {
    navigate(`/adminorder-details/${id}`)
  }

  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  }, [dispatch, data])
  
  return (
    <section>
      <div className='order'>
        <h2>All Orders</h2>
        <br/>
        <>
        {isLoading && <Loader/>}
        <div className='table'>
          {orders.lenght === 0 ? (
            <p>No order found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th className='histh-right'>Order Amount</th>
                  <th className='histh-right'>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {/* แก้ filteredOrders ให้กลับมาเป็น orders เพื่อดูรายการทั้งหมดใน db */}
                {orders.map((order, index) => {
                  const {id, orderDate, orderTime, orderAmount, orderStatus} = order
                  return(
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>{orderDate} at {orderTime}</td>
                      <td>{id}</td>
                      <td className='histd-right'>{orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;{"THB"}</td>
                      <td className='histd-right'>
                        <p className={orderStatus !== "Successed" ? `${'pending'}` : `${'successed'}`}>
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        </>
      </div>
    </section>
  )
}

export default AdminOrders
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../component/customHooks/useFetchCollection'
import { selectUserID } from '../../redux/slice/authSlice'
import { selectOrderHistory, STORE_ORDERS } from '../../redux/slice/orderSlice'
import '../../styles/Pages/Order/OrderHistory.css'
import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom'


// const OrderHistory = () => {

//   const {data, isLoading} = useFetchCollection('orders')
//   const orders = useSelector(selectOrderHistory)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const userID = useSelector(selectUserID)

//   console.log(data)
//   console.log("1")

//   const filteredOrders = orders.filter((order) => order.userID === userID)

//   const handleClick = (id) => {
//     navigate('/order-details/${id}')
//   }

//   useEffect(() => {
//     dispatch(STORE_ORDERS(data))
//   }, [dispatch, data])

//   return (
//     <section>
//       <div className='order'>
//         <h2>Your Order</h2>
//         {/* <p>Open an order to leave a <b>Service Review</b></p> */}
//         <br/>
//         <>
//         {isLoading && <Loader/>}
//         <div className='table'>
//           {orders.lenght === 0 ? (
//             <p>No order found</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>s/n</th>
//                   <th>Date</th>
//                   <th>Order ID</th>
//                   <th className='histh-right'>Order Amount</th>
//                   <th className='histh-right'>Order Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.map((order, index) => {
//                   const {id, orderDate, orderTime, orderAmount, orderStatus} = order
//                   return(
//                     <tr key={id} onClick={() => handleClick(id)}>
//                     {/* <tr key={id}> */}
//                       <td>{index + 1}</td>
//                       <td>{orderDate} at {orderTime}</td>
//                       <td>{id}</td>
//                       <td className='histd-right'>{orderAmount}{"THB"}</td>
//                       <td className='histd-right'>
//                         <p className={orderStatus !== "Successed" ? `${'pending'}` : `${'successed'}`}>
//                           {orderStatus}
//                         </p>
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>
//         </>
//       </div>
//     </section>
//   )
// }

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${'order'}`}>
        <h2>Your Order History</h2>
        {/* <p>
          Open an order to leave a <b>Product Review</b>
        </p> */}
        <br />
        <>
          {isLoading && <Loader />}
          <div className={'table'}>
            {filteredOrders.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"THB"}
                          {orderAmount}
                        </td>
                        <td>
                          <p className={orderStatus !== "Successed" ? `${'pending'}` : `${'successed'}`}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import loader from '../../assets/loader1.gif'
import useFetchDocument from '../../component/customHooks/useFetchDocument'

const OrderDetails = () => {

  const [order, setOrder] = useState(null)
  const {id} = useParams()
  const {document} = useFetchDocument("orders", id)

  useEffect(() => {
    setOrder(document)
  }, [document])
  
  console.log(order)

  return (
    <div className='table'>
      <h2>Order Details</h2>
      <div>
        <Link to = '/order-history' className='order-history'>&larr; Back to Orders</Link>
      </div>
      <br/>
      {order === null ? (
          <img src={loader} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID:</b> &nbsp;{order.id}
            </p>
            <p>
              <b>Order Amount:</b> &nbsp;{order.orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}THB
            </p>
            <p>
              <b>Appointed Date:</b> &nbsp;{order.serviceDate}
            </p>
            <p>
              <b>Order Status:</b> &nbsp;{order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Service</th>
                  <th className='th-right'>Price</th>
                  <th className='th-right'>Quantity</th>
                  <th className='th-right'>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td className='td-right'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      <td  className='td-right'>{cartQuantity}</td>
                      <td  className='td-right'>{(price * cartQuantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
    </div>
  )
}

export default OrderDetails
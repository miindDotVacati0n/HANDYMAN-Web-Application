import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchCollection from '../../component/customHooks/useFetchCollection'
import useFetchDocument from '../../component/customHooks/useFetchDocument'
import Loader from '../../component/Loader'
import addressSlice from '../../redux/slice/addressSlice'
import ChangeOrderStatus from './ChangeOrderStatus'
import './../../styles/Admin/AdminOrderDetails.css'

const AdminOrderDetails = () => {

  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={'table'}>
        <h2>Order Details</h2>
        <div>
          <Link to="/adminorders">&larr; Back To Orders</Link>
        </div>
        <br />
        {order === null ? (
          <img src={Loader} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>User Name: </b> &nbsp;{order.userAddress.name}
            </p>
            <p>
              <b>User Email: </b> &nbsp;{order.userEmail}
            </p>
            <p>
              <b>Order ID: </b> &nbsp;{order.id}
            </p>
            <p>
              <b>Order Amount: </b> &nbsp;{order.orderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;THB
            </p>
            <p>
              <b>Appointed Date: </b> &nbsp;{order.serviceDate}
            </p>
            <p>
              <b>Order Status: </b> &nbsp;{order.orderStatus}
            </p>
            <p>
              <b>Address:</b>
              <br />
              Address: {order.userAddress.line1},
              {order.userAddress.line2}, {order.userAddress.city}
              <br />
              State: {order.userAddress.state}
              <br/>
              Postal Code: {order.userAddress.postal_code}
              <br />
              Phone: {order.userAddress.phone}
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
                      <td className='td-right'>{cartQuantity}</td>
                      <td className='td-right'>{(price * cartQuantity).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
}

export default AdminOrderDetails
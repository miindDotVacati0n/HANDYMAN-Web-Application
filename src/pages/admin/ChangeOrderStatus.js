import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../component/Card';
import Loader from '../../component/Loader';
import { db } from '../../config/config';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import { selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectBillingAddress } from '../../redux/slice/checkoutSlice';
import '../../styles/Admin/ChangeOrderStatus.css'


const ChangeOrderStatus = ({ order, id }) => {

  // const userID = useSelector(selectUserID)
  // const userEmail = useSelector(selectEmail)
  // const cartItems = useSelector(selectCartItems)
  // const billingAddress = useSelector(selectBillingAddress)
  // const cartTotalAmount = useSelector(selectCartTotalAmount)

  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState("")
  // const [id, setId] = useState('')
  const [iden, setIden] = useState('')
  // const [date, setDate] = useState('')
  // const [time, setTime] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  const userID = useSelector(selectUserID)
  const userEmail = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();

    const orderConfig = {
      // userID: order.userID,
      // userEmail: order.userEmail,
      // orderDate: order.orderDate,
      // orderTime: order.orderTime,
      // orderAmount: order.orderAmount,
      // orderStatus: status,
      // cartItems: order.cartItems,
      // createdAt: order.createdAt,
      // editedAt: Timestamp.now().toDate(),
      userID: iden,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: Number(amount),
      orderStatus: status,
      cartItems,
      createdAt: Timestamp.now().toDate(),
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig)
      // setDoc(doc(db, "orderStatus", id), orderConfig);


      setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate("/adminorders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // const handlePrice = (e) => {
  //   const { name, value } = e.target;
  //   setCartAmount({
  //     ...cartAmount, [name]: value,
  //   })
  // }

  return (
    <>
      {isLoading && <Loader />}

      <div className={'status'}>
        <Card cardClass={'card'}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >

                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Pending...">Pending...</option>
                <option value="Processing...">In Processing...</option>
                <option value="Successed">Successed</option>
              </select>

            </span>
            <label>please fill order price</label>
            <br />
            <input type={'number'} placeholder='please fill order price' required name='orderAmount' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br /><br />
            <label>please fill order </label>
            <br />
            <input type={'text'} placeholder='please fill userID' required name='userID' value={iden} onChange={(e) => setIden(e.target.value)} />
            <br /><br />
            <span>
              <button type="submit" className="btn btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};


export default ChangeOrderStatus
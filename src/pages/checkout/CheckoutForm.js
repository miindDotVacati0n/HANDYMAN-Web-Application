import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import './../../styles/Pages/Checkout/CheckoutForm.css'
import CheckoutSummary from "./CheckoutSummary";
// import spinnerImg from '../../assets/loader1.gif'
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../redux/slice/cartSlice";
// import { selectAddress } from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { selectBillingAddress } from "../../redux/slice/checkoutSlice";
import { selectAddress } from "../../redux/slice/addressSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userID = useSelector(selectUserID)
  const userEmail = useSelector(selectEmail)
  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const userAddress = useSelector(selectAddress)


  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Not yet process...",
      cartItems,
      userAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);

      dispatch(CLEAR_CART())

      toast.success("Order saved")
      navigate('/checkout-success')
    } catch (error) {
      toast.error(error.message)

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);


    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section>
      <div className="checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="card">
              <CheckoutSummary />
            </div>
          </div>
          <div>
            <div className={`${'card'} ${'pay'}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id="payment-element" />
              <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                <span id="button-text">
                  {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                  {/* {isLoading ? (<img src='{spinnerImg}' alt="Loading..." style={{width: "20px"}} />) : "Pay now"} */}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}
              </div>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutForm;
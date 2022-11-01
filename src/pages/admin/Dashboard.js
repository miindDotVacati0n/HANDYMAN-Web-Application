import React, { useEffect } from 'react'
import InfoBox from '../dashboard/InfoBox';
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from '../../component/customHooks/useFetchCollection';
import { CALC_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from '../../redux/slice/orderSlice';
import { selectServices, STORE_SERVICES } from '../../redux/slice/serviceSlice';
import '../../styles/Admin/Dashboard.css'

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const serviceIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Dashboard = () => {
    const services = useSelector(selectServices);
    const orders = useSelector(selectOrderHistory);
    const totalOrderAmount = useSelector(selectTotalOrderAmount);
  
    const fbServices = useFetchCollection("services");
    const { data } = useFetchCollection("orders");
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(
        STORE_SERVICES({
          services: fbServices.data,
        })
      );
  
      dispatch(STORE_ORDERS(data));
  
      dispatch(CALC_TOTAL_ORDER_AMOUNT());
    }, [dispatch, data, fbServices]);
  
    return (
      <div className={'home'}>
        <div className={"info-box"}>
          {/* <InfoBox
            cardClass={`${'card'} ${'card1'}`}
            title={"Earnings"}
            count={`${totalOrderAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}THB`}
            icon={earningIcon}
          /> */}
          <InfoBox
            cardClass={`${'card'} ${'card2'}`}
            title={"Services"}
            count={services.length}
            icon={serviceIcon}
          />
          <InfoBox
            cardClass={`${'card'} ${'card3'}`}
            title={"Orders"}
            count={orders.length}
            icon={ordersIcon}
          />
        </div>
        
      </div>
    );
}

export default Dashboard
import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate =useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!food_list || food_list.length === 0) {
      console.warn("Food list not loaded yet. Try again.");
      return;
    }

    const orderItems = [];

    food_list.forEach((item) => {
      const quantity = cartItems[item._id];
      if (quantity > 0) {
        orderItems.push({ ...item, quantity });
      }
    });

    if (orderItems.length === 0) {
      alert("Cart is empty or item mismatch.");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: total
    };

    console.log("Sending token:", token);
    console.log("Order data:", orderData);

    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

       console.log("Server response:", response);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      console.error("Order placement error:", error); // 🛠️ Also log full error
  if (error.response) {
    console.error("Backend error response:", error.response.data); // 🛠️ Show actual backend message
  }
  alert("Something went wrong while placing the order.");
    }
  };

 

  useEffect(() =>
     {
      if(!token)
      {
        navigate('/cart');
      }
      else if(getTotalCartAmount() === 0)
      {
          navigate('/cart');
      }

  }, [token]);




  return (
    <>
      <form className='place-order' onSubmit={placeOrder}>
        <div className='place-order-left'>
          <p>Delivery Information</p>
          <div className='multi-fields'>
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
          <input required name="street" onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
          <div className='multi-fields'>
            <input required name="city" onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
            <input required name="state" onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
          </div>
          <div className='multi-fields'>
            <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zipcode' />
            <input required name="country" onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone no.' />
        </div>

        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Cart Total</h2>
            <div className='cart-hr'>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>₹{deliveryFee}</p>
              </div>
              <hr />
              <div className='cart-total-details'>
                <p>Total</p>
                <p>₹{total}</p>
              </div>
            </div>
            <button type='submit'>Proceed To Payment</button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Placeorder;

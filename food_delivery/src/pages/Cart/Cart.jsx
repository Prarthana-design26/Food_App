import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);
  const itemsInCart = food_list.filter(item => cartItems[item._id] > 0);
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {itemsInCart.length > 0 ? (
          itemsInCart.map(item => {
            const quantity = cartItems[item._id];
            return (
              <div className="cart-items cart-items-title" key={item._id}>
                <img src={url + "/images/" + item.image} alt={item.name} className="cart-item-image" />
                <p><strong>{item.name}</strong></p>
                <p>₹{item.price}</p>
                <p>{quantity}</p>
                <p>₹{item.price * quantity}</p>
                <p className='cross' onClick={() => removeFromCart(item._id)}>X</p>
              </div>
            );
          })
        ) : ""}
      </div>

      {/* ✅ Always show cart summary with fallback values */}
      <div className='cart-bottom'>
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
          <button
            onClick={() => navigate('/order')}
            disabled={subtotal === 0}
            style={{
              opacity: subtotal === 0 ? 0.6 : 1,
              cursor: subtotal === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Proceed To Checkout
          </button>
        </div>

        <div className='cart-promocode'>
          <p>If you have a promo code, enter it here:</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='promo-code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

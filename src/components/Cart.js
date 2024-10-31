import React, { useState } from 'react';

function Cart({cartItems, removeFromCart, amount, getTotalPrice, setShowPaymentForm}){
    return (

        <div className="cart">
            <div className="cart_item">
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name}: {item.size} - {item.price} x {item.quantity}
                            <button onClick={() => removeFromCart(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="cart_total" >Subtotal: {getTotalPrice()}</p>
            <p className="cart_total" > Tax: 13%</p>
            <p className="cart_total" >Total: {amount}</p>
            <div className="checkout">
                <button onClick={() => setShowPaymentForm(true)}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cart;
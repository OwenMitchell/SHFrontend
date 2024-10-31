import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState, useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './components/PaymentForm.js';
import Slider from "react-slick";

import Cart from './components/Cart.js'
import Merch from './components/Merch.js'
import Header from './components/Header.js'
import Gallery from './components/Gallery.js'
import Footer from './components/Footer.js'
//---Styles---------------------------------------------
import './styles/merch.css'
import './styles/header.css'
import './styles/gallery.css'
import './styles/cart.css'
import './styles/paymentForm.css'
import './styles/footer.css'

function App(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [amount, setAmount] = useState(20); // For example purposes
  const [showCart, setShowCart] = useState(true);


  const stripePromise = loadStripe('pk_test_51QEF9RLZmveBEED0GyHYLqDV4M9BDPlFerN8dDSAjZNzgNnv0QirCNoeCPwRR3DuW4bHJfs1v6hcIZLKlcJg6WIY0048d89Y0t');

  const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

  useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setAmount((getTotalPrice() * 1.13).toFixed(2));
        if (cartItems.length > 0){
          setShowCart(true)
        } else {
          setShowCart(false); 
          setShowPaymentForm(false);
        }

    }, [cartItems]);

  function addToCart(product) {
      var size = document.getElementById("size_"+product.id).value
      const exists = cartItems.find(item => item.id === product.id && item.size === size);
      
      if (exists) {
            setCartItems(
                cartItems.map(item =>
                    item.id === product.id && item.size === size? { ...item, quantity: item.quantity + 1} : item
                )
            );
          } else {

          
      setCartItems([...cartItems, { ...product, quantity: 1, size: size }]);
          }
    }

  const removeFromCart = (product) => {
        setCartItems(cartItems.filter(item => item.id !== product.id || item.size !== product.size));
    };

  const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    axios.get('https://jzt7fhb86p.us-east-2.awsapprunner.com/api/hello')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  if (error) return <p>{error}</p>;

  console.log(showCart)
  return (
    <div>
        <Header></Header>
        <Gallery></Gallery>
        <Merch 
          items={items} 
          addToCart={addToCart}/>
        {showCart ? <Cart 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          amount={amount}
          getTotalPrice={getTotalPrice}
          setShowPaymentForm={setShowPaymentForm}
        /> : <div></div>}
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={amount}
            cartItems={cartItems}
            showPaymentForm={showPaymentForm}
            setShowPaymentForm={setShowPaymentForm}
          />
        </Elements>
        <Footer></Footer> 
    </div> 
  );
}

export default App;

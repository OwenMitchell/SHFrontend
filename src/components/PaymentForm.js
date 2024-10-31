import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
axios.defaults.withCredentials = true;

function PaymentForm({ amount, showPaymentForm, setShowPaymentForm, cartItems }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const csrf = await axios.get("https://jzt7fhb86p.us-east-2.awsapprunner.com/api/get-csrf");
        const csrfToken = csrf.data['csrf_token'];
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

        

        if (!stripe || !elements) {
            return;
        }

        try {
            console.log(csrfToken);
           // Create a PaymentIntent on the backend
            const { data: { clientSecret } } = await axios.post('https://jzt7fhb86p.us-east-2.awsapprunner.com/api/create-payment-intent/', {
                amount: amount * 100, // Convert amount to cents
                cartItems: cartItems, 
            });

            // Confirm the card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                billing_details: {
                       name: `${firstName} ${lastName}`,
                       address: {
                            line1: address,
                            city: city,
                            state: state,
                            postal_code: zip,
                            country: country,
                        },
                        phone: phone,
                        email: email
                    },
                },
                shipping: {
                    name: `${firstName} ${lastName}`,
                    address: {
                        line1: address,
                        city: city,
                        state: state,
                        postal_code: zip,
                        country: country,
                    },
                    phone: phone,
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    alert('Payment successful!');
                    setShowPaymentForm(false);
                }
            }
        } catch (err) {
            console.error(err);
            setError('Payment failed');
        }

        setLoading(false);
    };

    return (
        showPaymentForm && (
            <form className="payment_form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder='First Name'
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder='Last Name'
                />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                    />
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        placeholder="Provence"
                    />
                    <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        required
                        placeholder="Postal Code"
                    />
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder='CA'
                    />
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="phone"
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="email"
                    />
                <CardElement />
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : `Pay $${amount}`}
                </button>
            </form>
        )
    );
}

export default PaymentForm;
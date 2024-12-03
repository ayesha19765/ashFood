import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/auth/myOrderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail'),
                }),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className="container">
                <div className="row">
                    {orderData.orderData && orderData.orderData.order_data.length > 0 ? (
                        orderData.orderData.order_data.slice(0).reverse().map((orderArray, index) => {
                            const orderDate = orderArray[0].Order_date;
                            const items = orderArray.slice(1);

                            return (
                                <div key={index} style={{ marginTop: '20px' }}>
                                    <div style={{ fontSize: '20px', marginBottom: '30px' }}>
                                        {orderDate}
                                        <hr />
                                    </div>
                                    <div className="row">
                                        {items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="col-12 col-md-6 col-lg-3 justify-content-center">
                                                <OrderCard
                                                    img={item.img}
                                                    name={item.name}
                                                    qty={item.qty}
                                                    size={item.size}
                                                    price={item.price}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No orders found</div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

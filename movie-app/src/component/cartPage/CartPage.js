import React, { useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartPage = ({ cartItems,clearCart, fetchCartItems,calculateTotalAmount }) => {

    useEffect(() => {
        fetchCartItems();
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            await axios.delete(`/api/cart/${itemId}`);
            fetchCartItems();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="h-100 gradient-custom">
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center mb-4 py-3">
                                <h5 className="mb-0">Cart - {cartItems.length} items</h5>
                                <button className="btn btn-danger" onClick={clearCart}>
                                    Clear All Cart
                                </button>
                            </div>
                            <div className="card-body">
                                {cartItems.length === 0 ? (
                                    <p style={{textAlign: "center"}}><strong>Your cart is empty. Go shop for products.</strong></p>
                                ) : (
                                    cartItems.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            removeFromCart={removeFromCart}
                                            showRemove={true}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {cartItems.length > 0 && <CartSummary totalAmount={calculateTotalAmount(cartItems)} />}
                    </div>
                </div>
            </div>
        </section>
    );

};

export default CartPage;

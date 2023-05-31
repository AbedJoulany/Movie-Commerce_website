import React from 'react';

const CartItem = ({ item, removeFromCart, showRemove }) => {
    return (
        <div className="row" key={item.id}>
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div
                    className="bg-image hover-overlay hover-zoom ripple rounded"
                    data-mdb-ripple-color="light"
                >
                    <img src={item.imageUrl} className="w-100" alt={item.title} />
                </div>
            </div>
            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                <h6 className="text-muted" style={{ fontStyle: 'italic', fontSize: '1.5rem'}}>
                    {item.title}
                </h6>
                <h6 className="text-black mb-0" style={{ fontSize: '1.2rem' }}>{item.releaseDate}</h6>
                <h6 className="text-black mb-0" style={{ fontSize: '1.3rem',marginTop: '1rem' }}>${item.price}</h6>
            </div>
            <div className="col-lg-4 col-md-6 d-flex align-items-center justify-content-end">
                {showRemove && <button
                    type="button"
                    className="btn btn-primary btn-sm me-1 mb-2"
                    onClick={() => removeFromCart(item.id)}
                    data-mdb-toggle="tooltip"
                    title="Remove item"
                >
                    <i className="fas fa-trash"></i>
                </button>
                }
            </div>
            <hr className="my-4" />
        </div>
    );
};

export default CartItem;

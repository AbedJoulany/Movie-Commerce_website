import React, {useEffect, useState} from 'react';
import popcornImage from './popcorn.png'
import NotificationBar from './NotificationBar';
const SearchResults = ({ searchResults, onAddToCart }) => {
    const [message, setMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleImageError = (event) => {

        event.target.src = popcornImage;
    };
    const handleAddToCart = (itemId) => {
        onAddToCart(itemId);
        setMessage('Item added to cart!');
        setShowNotification(true);
    };

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [showNotification]);
    return (
        <div className="row">
            {searchResults.map((result) => (
                <div className="col-md-4 mb-4" key={result.id}>
                    <div className="card">
                            <img
                                src={result.poster_path}
                                className="card-img-top"
                                alt={result.title}
                                onError={(event) => handleImageError(event, result)}
                            />

                        <div className="card-body">
                            <h5 className="card-title">{result.title}</h5>
                            <h6 className="card-text">{result.release_date}</h6>
                            <p className="card-text">Price: ${result.price}</p>
                            <button
                                className="btn btn-primary "
                                onClick={() => handleAddToCart(result.id)}
                            >
                                Add to Cart
                                <i className="fas fa-shopping-cart ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {showNotification && <NotificationBar
                showNotification={showNotification}
                setShowNotification={setShowNotification}
            />}
        </div>
    );
};

export default SearchResults;

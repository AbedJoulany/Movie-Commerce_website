import './NotificationBar.css';

const NotificationBar = ({ showNotification, setShowNotification }) => {
    const handleClose = () => {
        setShowNotification(false);
    };

    return (
        <div className={`notification-bar ${showNotification ? 'show' : ''}`}>
            <p>Item added to cart!</p>
            <button className="close-button" onClick={handleClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

export default NotificationBar;

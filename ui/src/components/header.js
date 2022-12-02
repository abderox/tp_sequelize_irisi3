import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './cart';
import Badge from 'react-bootstrap/Badge';


const Navbar = ({ props }) => {


    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState();
    const [showCart, setshowCart] = useState(false);
    const [cartCount, setcartCount] = useState(0);
    const [orderSuccess, setorderSuccess] = useState(false);

    const logout = () => {
        localStorage.removeItem('admin');
        navigate('/bookery');
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('admin'));
        if (user) {
            setLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            setcartCount(cart.length);
        }
    }, [JSON.parse(localStorage.getItem('cart'))]);

    const handleShowCart = (e) => {
        setshowCart(!showCart);
    }

    const handleCloseModal = () => {
        setshowCart(false);
    }

    const handleOrderSuccess = () => {
        setorderSuccess(true);
    }

    return (
        <nav class="navbar navbar-light bg-light">
            {
                orderSuccess && <Alert variant="success" onClose={() => setorderSuccess(false)} dismissible style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    left: '0',
                    zIndex: '9999',
                    textAlign: 'center',
                    borderRadius: '0',
                    margin: 'auto',
                }}>
                    <Alert.Heading>{'Hey, Thanks for buying from us :)'}</Alert.Heading>
                    <p>
                        Your order has been successfully recorded , we wil contact you soon!
                    </p>
                    <p>
                        {'We hope you enjoy the books !'}

                    </p>
                </Alert>}

            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/7950F2/external-books-education-smashingstocks-hand-drawn-black-smashing-stocks.png" alt="" width="100" height="100" />
                    <span className="text-muted" style={{ fontSize: '30pt' }}> Majorel books</span>
                </a>
                <form class="d-flex  align-items-center
                justify-content-center">
                    <p className="text-muted pt-2" style={{ fontSize: '13pt' }}>"the best book store !"</p>

                    {!loggedIn && <button style={{ all: 'unset', cursor: 'pointer', marginLeft: '10px' }} onClick={() => navigate('/register')}><img src="https://img.icons8.com/external-flat-wichaiwi/36/null/external-client-customer-validation-flat-wichaiwi-2.png" /></button>}
                    {
                        !loggedIn ? <button style={{ all: 'unset', cursor: 'pointer', marginLeft: '5px' }} onClick={() => navigate('/login')}><img src="https://img.icons8.com/color-glass/42/null/admin-settings-male.png" /></button> :
                            <button style={{ all: 'unset', cursor: 'pointer', marginLeft: '5px' }} onClick={logout}><img src="https://img.icons8.com/cotton/36/null/logout-rounded.png" /></button>
                    }

                </form>
                {/* adding register button */}


            </div>
            {/* gray navbar */}
            <div className="container justify-content-center mt-1 p-2" style={{
                backgroundColor: '#EDEEF7',
                borderRadius: '10px',
            }}>

                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        {!loggedIn ? <button style={{
                            all: 'unset',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '15pt',

                        }}
                            onClick={handleShowCart}
                        >
                            <span className="nav-link " style={{ color: '#7950F2' }}>
                                <img src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/48/null/external-book-shelves-education-smashingstocks-isometric-smashing-stocks.png" alt="cart" />
                                <Badge
                                    bg="secondary"
                                    text="light"
                                    style={{ marginLeft: '5px' }}
                                >
                                    {cartCount}
                                </Badge>

                            </span>
                        </button> :
                        <>
                            <button style={{ all: 'unset', cursor: 'pointer' }} onClick={() => navigate('/commands')}><img src="https://img.icons8.com/pastel-glyph/32/7950F2/successful-delivery.png" /> <span style={{ color: '#7950F2' , fontWeight: 'bold' }}>Orders</span></button>
                            {/* delimiter */}
                            <span style={{ color: '#7950F2' , fontWeight: 'bold' , marginLeft: '20px' }}> | </span>
                            <button style={{ all: 'unset', cursor: 'pointer', marginLeft: '20px' }} onClick={() => navigate('/bookery')}><img src="https://img.icons8.com/ios-glyphs/32/7950F2/courses.png" /> <span style={{ color: '#7950F2' , fontWeight: 'bold' }}>Books</span></button>
                            </>
                        }

                    </li>
                </ul>

            </div>

            {showCart && <Cart handleShowCart={handleCloseModal} handleOrderSuccess={handleOrderSuccess} />}

        </nav>
    )
}

export default Navbar
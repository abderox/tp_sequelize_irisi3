import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Navbar = ({ props }) => {


    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState();
    const logout = () => {
        localStorage.removeItem('admin');
        navigate('/');
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('admin'));
        if (user) {
            setLoggedIn(true);
        }
    }, [])


    return (
        <nav class="navbar navbar-light bg-light">

            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="https://img.icons8.com/hands/100/000000/experimental-book-reading-hands.png" alt="" width="100" height="100" />
                    <span className="text-muted" style={{ fontSize: '35pt' }}> Bookery</span>
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
        </nav>
    )
}

export default Navbar
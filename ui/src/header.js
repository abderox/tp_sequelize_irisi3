import React from 'react'

const Navbar = ({props}) => {

   
    return (
        <nav class="navbar navbar-light bg-light">

            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="https://img.icons8.com/hands/100/000000/experimental-book-reading-hands.png" alt="" width="100" height="100" />
                    <span className="text-muted" style={{ fontSize: '35pt' }}> Bookery</span>
                </a>
                <form class="d-flex">
                    <p className="text-muted" style={{ fontSize: '13pt'}}>"the best book store !"</p>
                </form>
                
            </div>
        </nav>
    )
}

export default Navbar
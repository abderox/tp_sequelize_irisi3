import React from 'react'

function Footer() {
    return (
        <footer className
            ="footer mt-auto py-3 bg-light">
            <div className="container">
                <div className="
                row">
                    <div className="col-12 col-md">
                        <small className="d-block mb-3 text-muted">Majorel books © 2022-2023</small>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="link-secondary text-decoration-none" href="#">Cool stuff</a></li>
                            <li><a className="link-secondary text-decoration-none" href="#">random books</a></li>
                            <li><a className="link-secondary text-decoration-none" href="#">Top ranked books</a></li>
                        </ul>
                    </div>
                </div>
                <span className="text-muted">This website is developed by 
                <a href="http://github.com/abderox" target="_blank" className="text-decoration-none"
                    rel="noreferrer"
                > Abdelhadi Mouzafir</a></span>
            </div>
        </footer>

    )
}

export default Footer
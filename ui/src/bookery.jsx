import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Badge from 'react-bootstrap/Badge';
import InfoModal from './modal';
import EditModal from './modalEdit'
import OrderModel from './createOrder';
import authHeader from './authHeader';



function Bookery() {

    const [books, setbooks] = useState([]);
    const [loading, setloading] = useState(false);
    const [genres, setgenres] = useState([]);
    const [show, setShow] = useState(false);
    const [show_, setShow_] = useState(false);
    const [show__, setShow__] = useState(false);
    const [data, setdata] = useState([]);
    const [search,setsearch] = useState([]);
    const [admin,setAdmin] = useState(false);
    const imageURL = "http://localhost:8085/api/books/download/"


    useEffect(() => {
        // check local storage user roles
        const user = JSON.parse(localStorage.getItem('admin'));
        if (user) {
            if (user?.authorities?.includes("ROLE_ADMIN")) {
                setAdmin(true);
            }
        }
        
        setloading(true);
        axios.get('http://localhost:8085/api/books')
            .then(res => {
                console.log(res)

                setbooks(res.data.books);
                setdata(res.data.books);
                setgenres(res.data.genres.map(
                    (genre) => {
                        return genre.name
                    }
                ));
                setloading(false);


            })
    }, [])

    const handleOpenModal = () => {
        setShow(!show);
    }


    const refresh = (e) => {
        setloading(true);
        axios.get('http://localhost:8085/api/books')
            .then(res => {
                console.log("refresh")
                setbooks(res.data.books);
                setdata(res.data.books);
                setloading(false);
            })
    }


    const handleSelectCategory = (e) => {
        const keyword = e.target.value;
        if (
            keyword === "All"
        ) {
            setdata(books)
        }
        else {
            setdata(books.filter(book => book.Genre.name === keyword))
        }
    }

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setsearch(keyword);
        if (keyword === "") {
            setdata(books)
        }
        else {
            setdata(books.filter(book => book.titre.toLowerCase().startsWith(keyword.toLowerCase())))
        }
    }

    const handledelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8085/api/books/${id}`,
            { headers: authHeader() })
            .then(res => {
                refresh();
            })
    }

    const handleOpenModalEdit = (e, id) => {
        setShow_(id);
    }

    const handleOpenModalOrder= (e,id) => {
        setShow__(id);
    }

    const handleSort = (e) => {
        const keyword = e.target.value;
        if (keyword === 'asc') {
            setdata([...data].sort((a, b) => a.price - b.price))
        } else if (keyword === 'desc') {
            setdata([...data].sort((a, b) => b.price - a.price))
        }
    }





    return (

        <div >


            <div className="d-block justify-content-center mt-2">
                <div className="row justify-content-center mb-5">

                    <div className="col-12">
                        <h1 className="text-center display-4 text-success fw-bold title-header" >Majorel books</h1>
                    </div>
                </div>
                <div className="row  justify-content-center m-4" style={{
                      backgroundColor: 'white',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'
                }}>

                    <div className="col-2 col-md  col-lg pt-2 ">
                        <button style={{ all: 'unset', cursor: 'pointer' }}
                            onClick={
                                refresh
                            }>
                        <img src="https://img.icons8.com/ios-filled/36/7950F2/update-left-rotation.png" alt="reset"/></button>
                    </div>

                    <div className="col-10 col-md-4 col-lg-4 pt-2">
                        <input type="text" className="form-control" placeholder="Search by title" name="search" value={search} 
                        onChange={
                            handleSearch
                        }
                        />

                    </div>
                    <div className="col-12 col-md-4 col-lg-4 pt-2">
                        <select onChange={handleSelectCategory} className="form-control pt-1">
                            <option value="All">All</option>
                            {!loading && genres.map((genre, index) => {
                                return <option key={index} value={genre}>{genre}</option>
                            })
                            }
                        </select>

                    </div>
                    <div className={admin ? 'col-md-2 col-lg-2 col-12 pt-2' : 'col-12 col-md-3 col-lg-3 pt-2'}>
                        <select className="form-control pt-1"
                            onChange={handleSort}
                        >
                            <option value="">Sort by price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    {admin && <div className="col-md-1 col-lg-1 col-12 mt-1">
                        <button style={{ all: 'unset', cursor: 'pointer' }}
                            onClick={handleOpenModal}
                            className="text-center"><img src="https://img.icons8.com/fluency/48/000000/plus-math.png" alt="add" /></button>
                        {show && <InfoModal />}
                    </div>}
                </div>

                <div className="row justify-content-center">
                    <hr
                        style={{
                            color: '#7950F2',
                            backgroundColor: '#7950F2',
                            height: 5,
                            width: '95%',
                            borderRadius: 5
                        }}
                    />
                </div>

                <div className=" justify-content-center">
                   
                        <div className="col-12 p-3" style={{ 

                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gridGap: '1rem',
                            gridAutoRows: 'minmax(100px, auto)',
                            borderRadius: '5px',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            padding: '20px',
                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                            padding: '20px',
                            marginBottom: '20px'

                        }}>
                            {!loading && data.map((book) => (

                                <div className="card p-3 m-1  " key={book?.id} style={{  height: '32rem', fontSize: '13px', border: '2px solid #7209b7' , background: '#ffffff',
                                boxShadow:  '26px 26px 52px #ededed, -26px -26px 52px #ffffff' }}>
                                    <div className="card-body text-center ">
                                        <img src={
                                            imageURL + book?.couverture
                                        } className="card-img-top" alt="..."
                                            style={{
                                                width: '100%',
                                                height: '15rem',
                                            }}
                                        />
                                        <h5 className="card-title ">{book?.titre || "no titre"} </h5>
                                        <h6 className="card-subtitle  text-muted">{book?.Genre.name || "no genre"}</h6>
                                        <p className="card-text pt-1" style={{ color: 'green', fontWeight: 'bold'}}>{book?.price || "no price"} MAD</p>
                                        <p className="card-text pt-1" style={{ maxHeight: '5rem', overflowY: 'scroll' }}>{book?.description || "no description"}</p>
                                        <div className="d-flex justify-content-center">
                                            {admin && <button style={{ all: 'unset', cursor: 'pointer' }}
                                                onClick={(e) => { handledelete(e, book.id) }}
                                                key={book.id + book?.titre}
                                            >
                                                <img src="https://img.icons8.com/color/28/000000/trash--v1.png" />
                                            </button>}
                                            
                                            {admin && <button style={{
                                                all: 'unset', cursor: 'pointer',
                                               
                                            }} key={book.id + book.price}
                                                onClick={(e) => { handleOpenModalEdit(e, book.id) }}
                                            >
                                                <img src="https://img.icons8.com/arcade/28/000000/pencil.png" />
                                            </button>}
                                            {
                                                show_ === book.id && <EditModal id={book.id} key={book.id} />
                                            }
                                            <button style={{
                                                all: 'unset', cursor: 'pointer',
                                               
                                            }} key={book.id + book.price}
                                                onClick={(e) => { handleOpenModalOrder(e,book.id) }}
                                            >
                                                <img src="https://img.icons8.com/fluency-systems-filled/32/7950F2/favorites.png" alt="save"/>
                                            </button>
                                            {
                                                show__ === book.id && <OrderModel title={book.titre} key={book.id} book={book.id} store={book.storage} price_={book.price} />
                                            }
                                        </div>
                                    </div>

                                </div>

                            ))}
                        </div>


                 
                </div>
              

            </div>
        </div>
    )
}

export default Bookery;
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../api/global-constants';


export default function OrderModel({ title, book, store, price_, category, editions, handleColseIt }) {


    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const handleClose = () => handleColseIt();
    const handleShow = () => setShow(true);
    const [loading, setloading] = useState(false);
    const [leftstore, setleftstore] = useState(0);
    const [price, setprice] = useState(0);
    const [dataToSend, setdataToSend] = useState({
        userId: 0,
        date: '',
        units: 0,
    });

    useEffect(() => {
        setleftstore(store)

    }, [store])



    const handleAdd = async () => {

        // check user in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register');
        }

        dataToSend.userId = JSON.parse(localStorage.getItem('user'))._id
        dataToSend.date = new Date().toISOString().slice(0, 10)

        let obj = {}
        obj.id = book;
        obj.units = dataToSend.units;
        obj.units = parseInt(dataToSend.units)
        delete dataToSend.units
        dataToSend.books.push(obj);

        console.log(dataToSend)

        await axios.post(API_URL+'/apiv2/books/order/', dataToSend)
            .then(res => {
                setloading(false);
                handleClose();
                window.location.reload()
            })

    }

    const handleSoustraction = (v) => {

        const store_ = parseInt(store);
        const units_ = parseInt(v || 0);
        const price__ = parseFloat(price_ || 0);
        console.log(store_)
        console.log(units_)
        console.log(store_ - units_)

        if (store_ > units_) {
            setleftstore(store_ - units_);
            setprice(price__ * units_);
        }
        else {
            setleftstore(store);
        }
    }


    const handleChange = (e) => {
        setdataToSend({
            ...dataToSend,
            [e.target.name]: e.target.value
        })
        handleSoustraction(e.target.value)
    }

    const addToCart = () => {
        // add to local storage cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cart_ = JSON.parse(localStorage.getItem('cart_')) || [];

        //check book id if exists replace
        let index = cart.findIndex(x => x.id === book);
        if (index > -1) {
            cart[index].units = dataToSend.units;
            cart_[index].units = dataToSend.units;
        }
        else {
            let obj = {}
            obj.id = book;
            obj.units = parseInt(dataToSend.units);
            cart.push(obj);

            let obj_ = { ...obj }
            obj_.price = price_;
            obj_.category = category;
            obj_.title = title;
            cart_.push(obj_);


        }

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cart_', JSON.stringify(cart_));
        handleClose();
    }




    return (
        <>


            <Modal show={show} centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order a book !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="justify-content-center d-block">
                        <div className="row">

                            <div className="col-12">
                                <label
                                    className=" mt-1 p-1"
                                    htmlFor="thisone_"
                                >
                                    Title
                                </label>
                                <input type="text"
                                    id="thisone_"
                                    className="form-control mt-1 p-1" placeholder="Book"
                                    disabled
                                    value={
                                        title
                                    }

                                />

                            </div>
                        </div>
                        <div className=" p-1 " style={{ 
                            marginTop:'10px',
                            marginBottom:'10px',
                            maxHeight:'200px',
                            overflow:'auto'
                        }}>
                            {/* map over book editions */}
                            <ListGroup >
                                <ListGroup.Item>
                                    <ListGroup horizontal>

                                        <ListGroup.Item style={{ width: '50%' }} className="font-weight-bold text-danger">Publisher</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '50%' }} className="font-weight-bold text-danger">Publishing date</ListGroup.Item>
                                    </ListGroup>
                                </ListGroup.Item>
                                {
                                    editions?.map((edition, index) => {
                                        return (
                                            <ListGroup.Item
                                                key={index}
                                                className="mt-2 p-1"
                                            >
                                                <ListGroup horizontal>

                                                    <ListGroup.Item style={{ width: '50%' }}>{edition?.maison_edition}</ListGroup.Item>
                                                    <ListGroup.Item style={{ width: '50%' }}>{edition?.date_parutiion}</ListGroup.Item>
                                                </ListGroup>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>

                        </div>
                        <div className="row mt-2 p-1 ">
                            <div className="col form-group">
                                <label
                                    className=" mt-1 p-1"
                                    htmlFor="thisone"
                                >
                                    Store
                                </label>
                                <input type="number" className
                                    ="form-control" placeholder="Available store" name="store"
                                    id="thisone"
                                    value={store}
                                    disabled
                                />

                            </div>
                            <small
                                style={{
                                    color: 'red',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}
                            >{leftstore} books will be left in store</small>
                        </div>

                        <div className="row mt-2 mb-2 p-1 ">
                            <div className="col">
                                <label
                                    className=" mt-1 p-1"
                                    htmlFor="thisone_1"
                                >
                                    How many units you want to order ?
                                </label>
                                <input type="number"
                                    id="thisone_1"
                                    className
                                    ="form-control" placeholder="Units" name="units"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.units
                                    }
                                />

                            </div>
                        </div>
                        <div className="row mt-2 p-1 ">
                            <div className="col">

                                <label
                                    className=" mt-1 p-1 "
                                    htmlFor="thisone_2"
                                    style={{
                                        color: 'gray',
                                        marginTop: '10px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    price*units : {price_ + "*" + (dataToSend.units || 0)}
                                </label>
                            </div>
                        </div>
                        <div className="row mt-2 p-1 ">


                            <div className="col"
                                style={{
                                    marginTop: '20px',
                                    backgroundColor: '#ffddd2',
                                    fontWeight: 'bold',
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    borderRadius: '5px'
                                }}
                            >
                                <label
                                    className=" mt-1 p-1 "
                                    htmlFor="cost_"

                                >
                                    #Total price :
                                </label>

                                <input type="text"
                                    id="cost_"
                                    style={{ all: 'unset', color: 'green', fontWeight: 'bold', width: "20%" }}
                                    placeholder="Price" name="price"
                                    value={price}
                                    disabled
                                />
                                <label
                                    className=" mt-1 p-1 text-success"
                                >
                                    MAD
                                </label>

                            </div>
                        </div>





                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={addToCart}>
                        {loading ? "Ordering..." : "Order"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
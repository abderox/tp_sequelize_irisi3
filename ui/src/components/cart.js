import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/global-constants';
export default function Cart({ handleShowCart, handleOrderSuccess }) {

    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const handleClose = () => handleShowCart();
    const handleShow = () => setShow(true);
    const [data, setdata] = useState();
    const [loading, setloading] = useState(false);
    // client from local storage
    const [client, setclient] = useState(JSON.parse(localStorage.getItem('user')));

    const [dataToSend, setdataToSend] = useState({
        userId: 0,
        date: '',
        books: [],
    });

    useEffect(() => {
        //get data from local storage
        const data = JSON.parse(localStorage.getItem('cart_'));
        if (
            data
        ) {
            setdata(data);
        }
    }, [])

    const handleRemoveFromLocalStorage = (index) => {
        let data = JSON.parse(localStorage.getItem('cart_'));
        let data_ = JSON.parse(localStorage.getItem('cart'));
        data.splice(index, 1);
        data_.splice(index, 1);
        localStorage.setItem('cart_', JSON.stringify(data));
        localStorage.setItem('cart', JSON.stringify(data_));
        setdata(data);
    }

    const handlePay = async () => {
        // check user in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/register',
                { state: { from: '/' } });
        }

        dataToSend.userId = JSON.parse(localStorage.getItem('user'))._id;

        dataToSend.date = new Date().toISOString().slice(0, 10)

        // get data from cart localStorage
        const data = JSON.parse(localStorage.getItem('cart'));
        dataToSend.books = data;


        await axios.post(API_URL+'/apiv2/books/order/', dataToSend)
            .then(res => {
                setloading(false);

                // remove data from local storage
                localStorage.setItem('cart_', JSON.stringify([]));
                localStorage.setItem('cart', JSON.stringify([]));
                handleOrderSuccess();
                handleClose();

            })
    }

    return (
        <>


            <Modal show={show} centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cart {' '}<Badge pill bg="success">
                        {
                            data?.length || 0
                        }

                    </Badge></Modal.Title>
                </Modal.Header>
                <Modal.Body>These are  the books you have selected !
                    {/* client information */}
                    <div className="d-flex flex-row"

                    >
                        <div className=" p-2 bg-light text-warning"
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            Client  : <strong>{client.email}</strong>
                        </div>

                    </div>

                    <div className="d-flex flex-row">

                        <div className="p-2  bg-light text-warning"
                            style={{
                                width: '100%',
                                height: '100%',
                                marginTop: '10px',
                                marginBottom: '10px',
                            }}
                        >
                            Delivery address  : <strong>{client.address}</strong>
                        </div>
                    </div>

                    <ListGroup>
                        <ListGroup.Item>
                            <ListGroup horizontal>

                                <ListGroup.Item style={{ width: '25%' }} className="font-weight-bold text-danger">Name</ListGroup.Item>
                                <ListGroup.Item style={{ width: '25%' }} className="font-weight-bold text-danger">Category</ListGroup.Item>
                                <ListGroup.Item style={{ width: '30%' }} className="font-weight-bold text-danger">Price (MAD)</ListGroup.Item>
                                <ListGroup.Item style={{ width: '20%' }} className="font-weight-bold text-danger">Units</ListGroup.Item>
                                <ListGroup.Item style={{ width: '15%' }} className="font-weight-bold text-danger">-</ListGroup.Item>


                            </ListGroup>
                        </ListGroup.Item>
                        {data?.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <ListGroup horizontal>
                                    <ListGroup.Item style={{ width: '25%' }}>{item.title}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: '25%' }}>{item.category}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: '30%' }} className="font-weight-bold text-primary">{item.price}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: '20%' }} className="font-weight-bold text-info">X {item.units}</ListGroup.Item>
                                    <ListGroup.Item style={{ width: '15%' }} className="font-weight-bold text-danger cursor-pointer">
                                        <button style={{
                                            all: 'unset',
                                        }} onClick={() => handleRemoveFromLocalStorage(index)}><img src="https://img.icons8.com/sf-regular-filled/32/FA5252/xbox-x.png" /></button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>
                    <span className="text-muted" style={{ fontSize: '15pt' }}>Total price : </span>
                    <Badge pill bg="success">
                        {
                            data?.reduce((acc, item) => {
                                return acc + (
                                    parseFloat(item.price) * parseInt(item.units)
                                )
                            }
                                , 0)
                        } {' '}MAD
                    </Badge>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handlePay}>
                        {loading ? "Ordering..." : "Order"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
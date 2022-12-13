import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import authHeader from '../api/authHeader';


export default function EditModal({ id, handleCloseEdit }) {

    const [show, setShow] = useState(true);
    const handleClose = () => handleCloseEdit();
    const handleShow = () => setShow(true);
    const [loading, setloading] = useState(false);
    const [file, setfile] = useState();
    const [data, setdata] = useState({});
    const [dataToSend, setdataToSend] = useState({
        titre: '',
        couverture: '',
        description: '',
        price: '',
        genre: '',
        publisher: '',
        publisher_date: '',
        editions: []
    });

    useEffect(() => {
        axios.get(`http://localhost:8085/apiv2/books/${id}`)
            .then(res => {

                setdata(res.data)
                setdataToSend((prev) => {
                    return {
                        ...prev,
                        titre: res.data.titre,
                        description: res.data.description,
                        price: res.data.price,
                        genre: res.data.genre.name,
                        couverture: res.data.couverture
                    }
                })
            })
    }, [])


    const handleAdd = async () => {

        delete dataToSend.publisher;
        delete dataToSend.publisher_date;

        dataToSend.price = parseFloat(dataToSend.price)
        console.log(dataToSend)

        await axios.put('http://localhost:8085/apiv2/books/' + id, dataToSend, { headers: authHeader() })

    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', file);

        if (
            file
        ) {
            return await axios.post('http://localhost:8085/apiv2/books/upload', formData, { headers: authHeader() })
        }
        else {
            return new Promise((resolve, reject) => {
                resolve()
            })
        }
        
    }

    const handleChangeFile = (e) => {
        e.preventDefault();
        dataToSend.couverture = e.target.files[0].name;
        setfile(e.target.files[0]);
    }

    const handleChange = (e) => {
        setdataToSend({
            ...dataToSend,
            [e.target.name]: e.target.value
        })
        console.log(dataToSend)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        Promise.all(
            [
                handleAdd(),
                uploadImage()
            ]
        ).then((res) => {
          
            setloading(false);
            handleClose();
            window.location.reload()
        }
        )

    }

    return (
        <>


            <Modal show={show} centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update book !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="justify-content-center d-block">
                        <div className="row mt-1 p-1 ">
                            <div className="col">
                                <input type="text" className
                                    ="form-control" placeholder="Title" name="titre"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.titre
                                    }
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <textarea className="form-control mt-1 p-1" placeholder="
                                Description" name="description" rows="3"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.description
                                    }

                                >{
                                        dataToSend.description
                                    }</textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" className
                                    ="form-control mt-1 p-1" placeholder="Price" name="price"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.price
                                    }

                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" className
                                    ="form-control mt-1 p-1" placeholder="Genre"
                                    value={
                                        dataToSend.genre
                                    }
                                    disabled
                                />
                            </div>
                            <div className="col">
                                <select
                                    className="form-select form-select-sm mt-1 p-1"
                                    aria-label=".form-select-sm example"
                                    name="genre"
                                    onChange={handleChange}


                                >
                                    <option value="other">Category</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Horror">Horror</option>
                                    <option value="fiction">Science fiction</option>
                                </select>

                            </div>

                        </div>
                        <div className=" p-1 " style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            maxHeight: '200px',
                            overflow: 'auto'
                        }}>
                            <label

                                className="form-label m-2"
                            >
                                Book publishers
                            </label>
                            {/* map over book editions */}
                            <ListGroup >
                                <ListGroup.Item>
                                    <ListGroup horizontal>

                                        <ListGroup.Item style={{ width: '50%' }} className="font-weight-bold text-danger">Publisher</ListGroup.Item>
                                        <ListGroup.Item style={{ width: '50%' }} className="font-weight-bold text-danger">Publishing date</ListGroup.Item>
                                    </ListGroup>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    className="mt-2 p-1"
                                >
                                    <ListGroup horizontal>

                                        <ListGroup.Item style={{ width: '45%' }}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Publisher"
                                                name="publisher"
                                                onChange={handleChange}

                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ width: '45%' }}>
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Publishing date"
                                                name="publisher_date"
                                                onChange={handleChange}
                                            />
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ width: '15%', cursor: 'pointer' }}>
                                            <button
                                                style={{
                                                    all: 'unset'
                                                }}
                                                onClick={() => {
                                                    setdataToSend({
                                                        ...dataToSend,
                                                        editions: [...dataToSend.editions, {
                                                            maison_edition: dataToSend.publisher,
                                                            date_parutiion: dataToSend.publisher_date
                                                        }]
                                                    })
                                                }}
                                            ><img src="https://img.icons8.com/flat-round/32/null/plus.png" /></button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </ListGroup.Item>
                                {
                                    dataToSend?.editions?.map((edition, index) => {
                                        return (
                                            <ListGroup.Item
                                                key={index + "d"}
                                                className="mt-2 p-1"
                                            >
                                                <ListGroup horizontal>

                                                    <ListGroup.Item style={{ width: '45%' }}>{edition.maison_edition}</ListGroup.Item>
                                                    <ListGroup.Item style={{ width: '45%' }}>{edition.date_parutiion}</ListGroup.Item>
                                                     {/* delete */}
                                                     <ListGroup.Item style={{ width: '15%', cursor: 'pointer' }}>
                                                        <button
                                                            style={{
                                                                all: 'unset', cursor: 'pointer'
                                                            }}
                                                            onClick={() => {
                                                                setdataToSend({
                                                                    ...dataToSend,
                                                                    editions: dataToSend.editions.filter((edition, indexEdition) => {
                                                                        return indexEdition !== index
                                                                    })
                                                                })
                                                            }}
                                                        ><img src="https://img.icons8.com/flat-round/32/null/minus.png" /></button> 
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                                {
                                    data.editions?.map((edition, index) => {
                                        return (
                                            <ListGroup.Item
                                                key={index}
                                                className="mt-2 p-1"
                                            >
                                                <ListGroup horizontal>

                                                    <ListGroup.Item style={{ width: '50%', color: 'blue' }}>{edition.maison_edition}</ListGroup.Item>
                                                    <ListGroup.Item style={{ width: '50%', color: 'blue' }}>{edition.date_parutiion}</ListGroup.Item>
                                                   
                                                </ListGroup>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>

                        </div>
                        <div className="row">
                            <div className="col">
                                <input
                                    type="file"
                                    className="form-control-file mt-1 p-1"
                                    id="exampleFormControlFile1"
                                    name="couverture"
                                    onChange={handleChangeFile}
                                />
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
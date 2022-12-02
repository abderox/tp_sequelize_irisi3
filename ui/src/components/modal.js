import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import authHeader from '../api/authHeader';

export default function InfoModal() {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setloading] = useState(false);
    const [file, setfile] = useState();
    const [dataToSend, setdataToSend] = useState({
        titre: '',
        couverture: '',
        description: '',
        price: '',
        genre: '',
        genre_:'',
        storage :'',
        maison_edition: '',
        edition_date: '',
    });


    const handleAdd = async () => {

        dataToSend.price = parseFloat(dataToSend.price)
        dataToSend.storage = parseInt(dataToSend.storage)

        if(dataToSend.genre_!==''){
            dataToSend.genre = dataToSend.genre_
            delete dataToSend.genre_
        }

        await axios.post('http://localhost:8085/api/books/', dataToSend , { headers: authHeader() })
            .then(res => {
                setloading(false);
                handleClose();
                window.location.reload()
            })

    }

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', file);

        if (
            file
        ) {
            return await axios.post('http://localhost:8085/api/books/upload', formData, { headers: authHeader() })
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
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setloading(true);
        Promise.all(
            [handleAdd(),
            uploadImage()]
        ).then((res) => {
            setloading(false)
            alert('Book added successfully')
        }
        )

    }

    return (
        <>


            <Modal show={show} centered >
                <Modal.Header closeButton>
                    <Modal.Title>New book !</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="justify-content-center d-block">
                        <div classNam="row mt-1 p-1 ">
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
                        <div classNam="row">
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
                        <div classNam="row">
                            <div className="col">
                                <input type="text" className
                                    ="form-control mt-1 p-1" placeholder="Price" name="price"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.price
                                    }

                                />
                            </div>
                            <div className="col">
                                <input type="text" className
                                    ="form-control mt-1 p-1" placeholder="Units" name="storage"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.storage
                                    }

                                />
                            </div>
                        </div>
                        <div classNam="row">
                            <div className="col-12">
                                <input type="text" className
                                    ="form-control mt-1 p-1" placeholder="Maison d'edition" name="maison_edition"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.maison_edition
                                    }

                                />
                            </div>
                            <div className="col-12">
                                <input type="date"
                                    className="form-control mt-1 p-1" placeholder="Date d'edition" name="edition_date"
                                    onChange={handleChange}
                                    value={
                                        dataToSend.edition_date
                                    }

                                />

                            </div>
                        </div>
                        <div classNam="row">
                            <div className="col-12">
                                <select
                                    className="form-select form-select-sm mt-1 p-1"
                                    aria-label=".form-select-sm example"
                                    name="genre"
                                    onChange={handleChange}


                                >
                                    <option value="Other">--category--</option>
                                    <option value="customized">Custom</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Horror">Horror</option>
                                    <option value="fiction">Science fiction</option>
                                </select>

                            </div>
                            {
                                dataToSend.genre === "customized" &&
                                <div className="col-12">
                                    <input type="text" className
                                        ="form-control mt-1 p-1" placeholder="Autre genre" name="genre_"
                                        onChange={handleChange}
                                        value={
                                            dataToSend.genre_
                                        }

                                    />
                                </div>

                            }
                            
                           
                        </div>
                        <div classNam="row">
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
                        {loading ? "saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
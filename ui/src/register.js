import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {


    const navigate = useNavigate();
    const [data, setdata] = useState({
        email: "",
        phone: "",
        address: "",
        nom: "",
        prenom: ""
    })

    const InputEvent = (event) => {
        const { name, value } = event.target;
        setdata((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })

    }


    const formSubmit = (e) => {
        e.preventDefault();
        // Check inputs
        if (Object.values(data)
            .some((value) => value === "")) {
            alert("Please fill all fields");
            return;
        }

        // Send data to server
        console.log(data);

        axios.post('http://localhost:8085/api/books/client/create', data)
            .then(res => {
                console.log(res.data);
                // save or overwrite to local storage
                localStorage.setItem('user', JSON.stringify(res.data));
                // redirect to home page
                navigate('/');
            }).catch(error =>
                console.log(error));
    }



    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5'
            }}
        >
            <div style={{
                width: '400px',
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)'

            }}>
                <h4 className="
            text-center
            mb-4
            
            ">These infos are required for delivery purposes</h4>

                <form>
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={
                            InputEvent
                        } />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputnom1">Nom</label>
                        <input type="text" className="form-control" id="exampleInputnom1" aria-describedby="nomHelp" name="nom" onChange={
                            InputEvent
                        } />
                        <small id="nomHelp" className="form-text text-muted">Valid name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputprenom1">prenom</label>
                        <input type="text" className="form-control" id="exampleInputprenom1" aria-describedby="prenomHelp" name="prenom" onChange={
                            InputEvent
                        } />
                        <small id="prenomHelp" className="form-text text-muted">Valid first name</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputphone1">Phone number</label>
                        <input type="tel" className="form-control" id="exampleInputphone1" aria-describedby="phoneHelp" name="phone" onChange={
                            InputEvent
                        } />
                        <small id="phoneHelp" className="form-text text-muted">
                            We'll never share your phone number with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputaddress1"> address</label>
                        <input type="text" className="form-control" id="exampleInputaddress1" aria-describedby="addressHelp" name="address" onChange={
                            InputEvent
                        } />
                        <small id="addressHelp" className="form-text text-muted">We'll never share your address with anyone else.</small>
                    </div>

                    <div className=" text-center  ">
                        {/* long button*/}
                        <button type="submit" className="btn btn-success  btn-block" onClick={formSubmit}>submit</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register;
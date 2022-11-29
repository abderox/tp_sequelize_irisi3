import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const navigate = useNavigate();
    const [data, setdata] = useState({
        username: "",
        password : ""
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

        axios.post('http://localhost:8085/api/auth/signin', data)
            .then(res => {
                console.log(res.data);
                // save or overwrite to local storage
                localStorage.setItem('admin', JSON.stringify(res.data));
                // redirect to home page
                navigate('/');
            }).catch(error =>
               alert(error.response.data.message));
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
                <h1 className="
            text-center
            mb-4
            
            ">Login</h1>

                <form>
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Email/Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="username" onChange={
                            InputEvent
                        } />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" aria-describedby="phoneHelp" name="password" onChange={
                            InputEvent
                        } />
                    </div>
                    
                    <div className="d-flex text-center justify-content-center mt-3 ">
                        {/* long button*/}
                        <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={formSubmit}>Login</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login;
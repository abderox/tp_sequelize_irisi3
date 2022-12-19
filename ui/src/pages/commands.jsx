import React from 'react'
import axios from 'axios'
import authHeader from '../api/authHeader';
import {API_URL} from '../api/global-constants';

function Commands() {

   
    const map = new Map(
        [
            ['ORDERED', 'bg-success'],
            ['RUNOUT', 'bg-warning'],
            ['PENDING', 'bg-primary'],
            ['PROCESSING', 'bg-info'],
            ['DECLINED', 'bg-danger']
        ]
    );

    const [commands, setCommands] = React.useState([]);

    React.useEffect(() => {
        axios.get(API_URL+'/apiv2/books/orders/all', 
        { headers: authHeader() })
            .then(res => {
                setCommands(res.data);
                console.log(res.data);
            })
    }, [])


    // refresh 
    const refresh = () => {
        axios.get(API_URL+'/apiv2/books/orders/all',
        { headers: authHeader() })
            .then(res => {
                setCommands(res.data);
                console.log(res.data);
            })
    }   


    const updateOrderStatus = (id,e) => {
        console.log(id);
        
        
        axios.put(API_URL+'/apiv2/books/order/decline/' + id, 
        { headers: authHeader() })
            .then(res => {
                // change command status to declined 
                setCommands(commands.map(command => {
                    if(command.id === id){
                        command.status = 'DECLINED';
                    }
                    return command;
                }
                ))
            })

    }

    const updateOrder = (id) =>{
        console.log(id);
        axios.put(API_URL+'/apiv2/books/order/update/' + id)
            .then(res => {
                // change command status to declined 
                setCommands(commands.map(command => {
                    if(command.id === id){
                        command.status = 'PROCESSING';
                    }
                    return command;
                }
                ))
            }).catch((ee) => {
                console.log(ee);
                setCommands(commands.map(command => {
                    if(command.id === id){
                        command.status = 'RUNOUT';
                    }
                    return command;
                }
                ))
            })
    }


    return (
        <div className="container" style={{
            minHeight : "70vh"
        }}>
            <h1 className="text-center m-3 display-3" style={{color: '#7950F2'}}>Orders</h1>
            <button
            className="mb-2" 
            style={{ all: 'unset', cursor: 'pointer' }}
                            onClick={
                                refresh
                            }>
                            <img src="https://img.icons8.com/ios-filled/36/7950F2/update-left-rotation.png" alt="reset" /></button>
            {/* orders table */}
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Ship To</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Book</th>
                            <th>Genre</th>
                            <th>Amount</th>
                            <th>Left</th>
                            <th>Units</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            commands.map((command, index) => (
                                <tr key={index}>
                                    <td>{command?.id}</td>
                                    <td>{command?.user?.email}</td>
                                    <td>{command?.user?.address}</td>
                                    <td>{command?.date}</td>
                                    <td><span className={`badge ${map.get(command?.status?.toUpperCase())}`}>{command?.status?.toUpperCase()}</span></td>
                                    <td>{command?.book?.titre}</td>
                                    <td className="text-muted">{command?.book?.Genre?.name}</td>
                                    <td>{command?.book?.price}</td>
                                    <td className="text-white bg-secondary text-center">{command?.book?.storage}</td>
                                    <td>X{command?.units}</td>
                                    <td className="
                                        text-center font-weight-bold text-white bg-info
                                    ">{parseFloat(command?.book?.price * command?.units)||0}</td>
                                    <td className="text-center bg-light">
                                        <button style={{ all: 'unset', cursor: 'pointer'}} onClick={(e)=>{updateOrder(command?.id,e)}} ><img src="https://img.icons8.com/external-creatype-glyph-colourcreatype/28/7950F2/external-accept-basic-creatype-glyph-colourcreatype.png" alt="ok" /></button>
                                        <button style={{ all: 'unset', cursor: 'pointer'}} onClick={(e)=>{updateOrderStatus(command?.id,e)}}><img src="https://img.icons8.com/ios-glyphs/28/FA5252/cancel.png" alt="no"/></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Commands;
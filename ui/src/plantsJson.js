import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState, useRef } from 'react';
import Badge from 'react-bootstrap/Badge';

import InfoModal from './modal';

const Plants = () => {



    const plants = [
        {
            name: 'monstera',
            category: 'classique',
            id: '1ed',
            isSolde: true,
            price: 10,
            sun: 4,
            water: 3,
        },
        {
            name: 'ficus lyrata',
            category: 'classique',
            id: '2ab',
            isSolde: false,
            price: 15,
            sun: 3,
            water: 2,
        },
        {
            name: 'pothos argenté',
            category: 'classique',
            id: '3sd',
            isSpecialOffer: true,
            price: 20,
            sun: 2,
            water: 1,
        },
        {
            name: 'yucca',
            category: 'classique',
            id: '4kk',
            price: 25,
            sun: 1,
            water: 3,
        },
        {
            name: 'olivier',
            category: 'extérieur',
            id: '5pl',
            isAvailable: false,
            isSolde: false,
            price: 30,
            sun: 4,
            water: 3,
        },
        {
            name: 'géranium',
            category: 'extérieur',
            id: '6uo',
            isSolde: true,
            price: 35,
            sun: 3,
            water: 2,
        },
        {
            name: 'basilique',
            category: 'extérieur',
            id: '7ie',
            isSpecialOffer: true,
            isSolde: true,
            price: 40,
            sun: 2,
            water: 1,
        },
        {
            name: 'aloe',
            category: 'plante grasse',
            id: '8fp',
            isSpecialOffer: true,
            price: 45,
            sun: 1,
            water: 3,
        },
        {
            name: 'succulente',
            category: 'plante grasse',
            id: '9vn',
            isSolde: true,
            price: 50,
            sun: 4,
            water: 3,
        }
    ]

    const categories = [...new Set(plants.map(plant => plant.category))]

    const [plantss, setPlantss] = useState(plants);

    const [cart, setCart] = useState([]);

    const [show, setShow] = useState(false);

    const [update, setUpdate] = useState(false);

    const sun = "https://img.icons8.com/tiny-color/16/000000/sun.png";
    const water = "https://img.icons8.com/external-others-inmotus-design/16/000000/external-Drop-16px-set-others-inmotus-design.png";



    const filtedData = (keyword) => {
        return plants.reduce((acc, plant) => {
            if (plant.category.includes(keyword)) {
                acc.push(plant)
            }
            return acc
        }, [])
    }

    const handleSelectCategory = (e) => {
        const keyword = e.target.value;
        setPlantss(filtedData(keyword))

    }

    const handleAddToCart = (plant) => {
        setUpdate(false)
        setCart((prev) => [...prev, plant])
        setUpdate(true)
    }

    const handleOpenModal = () => {
        setShow(!show);
    }

    const handleDelete = (id) => {
        setCart(cart.filter((plant) => plant.id !== id))
    }

    const needsSun = (plant, which) => {
        let suns = [];
        for (let i = 0; i < plant.sun; i++) {
            suns.push(<img src={sun} alt="sun" onClick={() => { showState(plant, which) }} />)
        }
        return suns;
    }

    const needsWater = (plant, which) => {

        let waters = [];
        for (let i = 0; i < plant.water; i++) {
            waters.push(<img src={water} alt="water" onClick={() => { showState(plant, which) }} />)
        }
        return waters;
    }

    const handleSort = (e) => {
        const keyword = e.target.value;
        if (keyword === 'asc') {
            setPlantss([...plantss].sort((a, b) => a.price - b.price))
        } else if (keyword === 'desc') {
            setPlantss([...plantss].sort((a, b) => b.price - a.price))
        }
        else if (keyword === 'name') {
            setPlantss([...plantss].sort((a, b) => a.name.localeCompare(b.name)))
        }
        else if (keyword === 'sold') {
            setPlantss([...plantss].filter((plant) => plant.isSolde))
        }
    }

    const showState = (plant, which) => {
        if (plant.suns >= 3 && which === "sun") {
            alert('needs to be exposed more time  to sun !')
        }
        else if (plant.suns <= 2 && which === "sun") {
            alert('needs to be exposed less time to sun !')
        }
        if (plant.water >= 3 && which === "water") {
            alert('needs to be watered more often !')
        }
        else if (plant.water <= 2 && which === "water") {
            alert('needs to be watered less often !')
        }
    }






    return (

        <div className="">


            <div className="d-block justify-content-center mt-2">
                <div className="row justify-content-center mb-5">
                    {
                        update && <Alert variant="success" onClose={() => setUpdate(false)} dismissible>
                            <Alert.Heading>{'Hey, Thanks for buying from us :)'}</Alert.Heading>
                            <p>
                                Your basket now contains : <Badge pill bg="success">
                                    {
                                        cart.length
                                    }

                                </Badge>
                            </p>
                            <p>
                                {'We hope you enjoy your new plant!'}

                            </p>
                        </Alert>

                    }
                    <div className="col-12">
                        <h1 className="text-center display-4 text-success fw-bold title-header" >Belfaa plants</h1>
                    </div>
                </div>
                <div className="row  justify-content-center">

                    <div className="col-1">
                        <button onClick={() => setPlantss(plants)} className="btn btn-secondary"><img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/28/FFFFFF/external-reset-basic-ui-elements-2.2-sbts2018-solid-sbts2018.png" /></button>
                    </div>

                    <div className="col-4">
                        <select onChange={handleSelectCategory} className="form-control pt-1">
                            <option value="">All</option>
                            {categories.map((plant, index) => {
                                return <option key={index} value={plant}>{plant}</option>
                            })
                            }
                        </select>

                    </div>
                    <div className="col-2">
                        <select onChange={handleSort} className="form-control pt-1">
                            <option value="">Sort by price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                            <option value="name">Name</option>
                            <option value="sold">Sold Out</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <button onClick={handleOpenModal} style={{ all: 'unset', cursor: 'pointer' }} className="text-center"><img src="https://img.icons8.com/color/48/000000/shopping-basket-2.png" /></button>
                        {show && <InfoModal data={cart} />}

                    </div>
                </div>

                <div className="row justify-content-center" style={{ maxHeight: '100vh' }}>
                    <div className="col-12 ">
                        <div className="col-12 d-flex align-content-around flex-wrap p-3">
                            {plantss.map((plant) => (

                                <div className="card p-3 m-1  " key={plant.id} style={{ width: '15rem', height: '19rem', fontSize: '13px', borderColor: 'green' }}>
                                    <div className="card-body text-center ">
                                        <img src={`https://source.unsplash.com/1600x900/?${plant.name}`} className="card-img-top" alt="..." />
                                        <h5 className="card-title ">{plant.name} </h5>
                                        <h6 className="card-subtitle  text-muted">{plant.category}</h6>
                                        <span className="badge  bg-success mt-5" style={{ width: '50%', height: '30px', fontSize: '14pt', position: 'absolute', top: '-16%', right: '0' }}>{plant.isSolde && "soldé"}</span>
                                        {/* <span className="badge  bg-warning mt-5" style={{ width: '50%', height: '30px', fontSize: '14pt', position: 'absolute', top: '-21%', left: '0' }}>{plant.isSpecialOffer && "offre spéciale"}</span> */}
                                        <p className="card-text pt-1">{plant.price} MAD</p>
                                        <div className="d-flex justify-content-around" >
                                            {needsSun(plant, "sun")}
                                            {needsWater(plant, "water")}
                                        </div>
                                    </div>
                                    <button key={plant.name} onClick={() => {
                                        console.log(plant)
                                        handleAddToCart(plant)
                                    }} style={{ all: 'unset', cursor: 'pointer' }} className="text-center"><img src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/000000/external-add-cart-ecommerce-anggara-flat-anggara-putra-3.png" /></button>
                                </div>

                            ))}
                        </div>


                    </div>
                </div>
                {/* <div className="d-flex justify-content-center mt-2">
                    <div className="">
                        <button onClick={() => setPlantss(plants)} className="btn btn-secondary"><img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/32/FFFFFF/external-reset-basic-ui-elements-2.2-sbts2018-solid-sbts2018.png" /></button>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Plants


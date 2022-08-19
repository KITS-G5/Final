import React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const RentBike = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        let url = 'http://localhost:8080/customer/getById/' + params.id ;
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                console.log(data)
            });
    }, []);

    return (
        <div>

            {product !== null ? <h1>{product.id}</h1> : 'loading'}
        </div>
    );
};

export default RentBike;
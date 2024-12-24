import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="product-view">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                        <h2>{product.name}</h2>
                        <p className="price">${product.price}</p>
                        <p className="description">{product.description}</p>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ProductList;

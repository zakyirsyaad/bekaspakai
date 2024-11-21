import React from 'react';

const ProductDetail = ({ product, typeproduct }) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Type: {typeproduct}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductDetail;

import React from 'react';
import { notFound } from 'next/navigation'; // To handle 404 errors
import { fetchProductById } from '@/lib/productApi';

const ProductDetailPage = async ({ params }) => {
    let { typeproduct, id, nameproduct } = params;
    typeproduct = decodeURI(typeproduct);

    // Fetch product details (example only)
    const product = await fetchProductById(id);
    console.log(product)

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div>
            <h1>Product Detail - {typeproduct}</h1>
            <div>
                <h2>{product.name}</h2>
                <h3>{product.id}</h3>
                <img src={product.image} alt={product.name} />
                <p className=' whitespace-pre-line'>{product.description}</p>
                <p>Type: {typeproduct}</p>
                <p>Price: {product.price}</p>
            </div>
        </div>
    );
};

export default ProductDetailPage;

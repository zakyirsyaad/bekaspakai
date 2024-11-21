// Replace these URLs with your actual API endpoints
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

export const fetchProductsJualBeli = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=4&tipe=Jual Beli&isAvailable=yes`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json(); // Assuming the API returns a JSON response
        return data.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchProductsDonasi = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=4&tipe=Donasi&isAvailable=yes`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json(); // Assuming the API returns a JSON response
        return data.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchUserProducts = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products?toko=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json(); // Assuming the API returns a JSON response
        return data.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store', // Avoid caching for fresh data
        });
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        return data.data.product;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
};


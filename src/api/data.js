import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const endpoints = {
    furniture: '/data/catalog/'
};

async function getAllProducts() {
    return api.get(endpoints.furniture);
}

async function getProductById(id) {
    return api.get(endpoints.furniture + id);
}

async function createProduct(data) {
    return api.post(endpoints.furniture, data);
}

async function editProduct(id, data) {
    return api.put(endpoints.furniture + id, data);
}

async function deleteProductById(id) {
    return api.del(endpoints.furniture + id);
}

async function getFurnitureByUserId(id) {
    return api.get(endpoints.furniture + `?where=_ownerId%3D%22${id}%22`);
}


export {
    login,
    register,
    logout,
    getProductById,
    getAllProducts,
    createProduct,
    editProduct,
    deleteProductById,
    getFurnitureByUserId
}
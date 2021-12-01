import * as api from './api.js';


const login = api.login;
const register = api.register;
const logout = api.logout;

const pageSize = 4;

const endpoints = {
    allProducts: '/data/catalog?pageSize=4&offset=',
    count: '/data/catalog?',
    productById: '/data/catalog/',
    productsOfUser: (userId) => `/data/catalog/?where=_ownerId%3D%22${userId}%22&pageSize=4&offset=`,
    productsOfUserCount: (userId) =>  `/data/catalog/?where=_ownerId%3D%22${userId}%22`,
    create: '/data/catalog',
    edit: '/data/catalog/',
    delete: '/data/catalog/'
};

// async function getAllProducts(page) {
//     const [data, count] = await Promise.all([
//         api.get(endpoints.allProducts + (page - 1) * pageSize),
//         api.get(endpoints.count)
//     ]);
//     return {
//         data,
//         pages: Math.ceil(count / pageSize)
//     };
// }

async function getPagesCount(search) {
    let url = endpoints.count;

    if (search) {
        url += 'where=' + encodeURIComponent(`make LIKE "${search}"`) + '&count';
    } else {
        url += 'count';
    }

    return api.get(url);
}

async function getAllProducts(page, search) {
    let url = endpoints.allProducts + (page - 1) * pageSize;

    if (search) {
        url += '&where=' + encodeURIComponent(`make LIKE "${search}"`);
    }

    return api.get(url);
}

async function getPagesCountOfUserProducts(id, search) {
    let url = endpoints.productsOfUserCount(id);

    if (search) {
        url += '&where=' + encodeURIComponent(`make LIKE "${search}"`) + '&count';
    } else {
        url += '&count';
    }

    return api.get(url);
}

async function getAllProductsOfUserId(page, id, search) {
    let url = endpoints.productsOfUser(id) + (page - 1) * pageSize

    if (search) {
        url += '&where=' + encodeURIComponent(`make LIKE "${search}"`);
    }

    return api.get(url);
}

async function getProductById(id) {
    return api.get(endpoints.productById + id);
}

async function createProduct(data) {
    return api.post(endpoints.create, data);
}

async function editProduct(id, data) {
    return api.put(endpoints.edit + id, data);
}

async function deleteProductById(id) {
    return api.del(endpoints.delete + id);
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
    getAllProductsOfUserId,
    getPagesCount,
    getPagesCountOfUserProducts,
    pageSize
}
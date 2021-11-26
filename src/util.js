import { deleteProductById, getProductById } from "./api/data.js";

function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

function setUserdata(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

function clearUserData() {
    sessionStorage.removeItem('userData');
}

function isLogged() {
    return !(sessionStorage.getItem('userData') === null);
}

async function loadProduct(ctx, next) {
    const productPromise = getProductById(ctx.params.id);
    ctx.productPromise = productPromise;
    next();
}

async function deleteProduct(ctx) {
    await deleteProductById(ctx.params.id);
    ctx.page.redirect('/home');
}

function isValidUrl(str) {
    let a  = document.createElement('a');
    a.href = str;
    return (a.host && a.host !== window.location.host);
}

function createNewProductValidator(obj) {

    if (obj.make.length < 4) {
        throw {
            error: new Error('Make name must be at least 4 symbols long'),
            errors: {
                make: true
            }
        }
    }
    if (obj.model.length < 4) {
        throw {
            error: new Error('Model name must be at least 4 symbols long'),
            errors: {
                model: true
            }
        }
    }
    if (obj.year < 1950 || obj.year > 2050) {
        throw {
            error: new Error('Year must be between 1950 and 2050!'),
            errors: {
                year: true
            }
        }
    }
    if (obj.description.length < 10) {
        throw {
            error: new Error('Description must be at least 10 symbols long'),
            errors: {
                description: true
            }
        }
    }
    if (obj.price < 1) {
        throw {
            error: new Error('Price must be a positive number'),
            errors: {
                price: true
            }
        }
    }
    if (!isValidUrl(obj.img)) {
        throw {
            error: new Error('Image must be a valid URL'),
            errors: {
                img: true
            }
        }
    }
    for (let i in obj) {
        if (obj[i] === '' || obj[i] === 0) {
            obj[i] = true;
        }
    }

    if (Object.values(obj).includes(true)) {
        throw {
            error: new Error('All required fields must be filled'),
            errors: obj
        }
    }
}

export {
    getUserData,
    setUserdata,
    clearUserData,
    isLogged,
    loadProduct,
    deleteProduct,
    createNewProductValidator
};
import {getAllProducts, getFurnitureByUserId} from "../api/data.js";
import { html, until } from "../lib.js";
import {getUserData} from "../util.js";

const catalogTemplate = (productPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${until(productPromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

const myFurnitureTemplate = (productPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${until(productPromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

const productCardTemplate = (product) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${product.img}" />
                <p>${product.description}</p>
                <footer>
                    <p>Price: <span>${product.price} $</span></p>
                </footer>
                <div>
                    <a href=${`/details/${product._id}`} class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`;

function catalogPage(ctx) {
    ctx.render(catalogTemplate(loadProducts()));
}

function myFurniturePage(ctx) {
    const user = getUserData();
    ctx.render(myFurnitureTemplate(loadUserProducts(user.id)));
}

async function loadProducts() {
    const products = await getAllProducts();
    return products.map(productCardTemplate); //<<<<<<<<<<<<<<<<?????
}

async function loadUserProducts(id) {
    const products = await getFurnitureByUserId(id);
    return products.map(productCardTemplate);
}

export {
    catalogPage,
    myFurniturePage
}
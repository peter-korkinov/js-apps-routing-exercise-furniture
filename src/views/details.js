import { getUserData } from "../util.js";
import { html, until } from "/src/lib.js";


const detailsTemplate = (productPromise) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        ${until(productPromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

const productTemplate = (product) => html`    
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                ${
                    product.isNotLegacy 
                        ? html`<img src="${product.img}"/>`
                        : html`<img src="${`../.${product.img}`}"/>`
                }
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Material: <span>${product.material}</span></p>
        ${
            product.isOwner
                ? html` 
                <div>
                    <a href=${`/edit/${product._id}`} class="btn btn-info">Edit</a>
                    <a href=${`/delete/${product._id}`} class="btn btn-red">Delete</a>
                </div>` 
                : null
        }
    </div>    
`;

function detailsPage(ctx) {
    ctx.render(detailsTemplate(loadProduct(ctx)));
}

async function loadProduct(ctx) {
    const product = await ctx.productPromise;

    const userData = getUserData();
    if (userData && userData.id === product._ownerId) {
        product.isOwner = true;
    }

    return productTemplate(product);
}

export {
    detailsPage
}
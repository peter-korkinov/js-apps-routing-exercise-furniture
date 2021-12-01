import {
    getAllProducts,
    getAllProductsOfUserId,
    getPagesCount,
    getPagesCountOfUserProducts,
    pageSize
} from "../api/data.js";
import { html, until } from "../lib.js";
import {getUserData, parseQueryString} from "../util.js";


const catalogTemplate = (productPromise, pagerPromise, userpage, onSearch, search) => html`
    <div class="row space-top">
        <div class="col-md-12">
            ${
                userpage
                ? html`
                    <h1>My Furniture</h1>
                    <p>This is a list of your publications.</p>
                `
                : html`
                    <div id="catalog-head">
                    <h1>Welcome to Furniture System</h1>
                    <p id="pari">Select furniture from the catalog to view details.</p>
                    </div>
                `
            }
            <form @submit="${onSearch}" id="search-form" class="form-group">
                <input id="search-field" class="form-control" type="text" name="search" placeholder="Search here" .value="${search}">
                <input id="search-btn" class="btn btn-primary" type="submit" value="Search">
            </form>
        </div>
        <div class="row space-top">
            ${until(pagerPromise, html`<a href="javascript:void(0)" class="page-index btn btn-info">Loading &hellip;</a>`)}
        </div>
    </div>
    
    <div class="row space-top">
        ${until(productPromise, html`<p>Loading &hellip;</p>`)}
    </div>
`;

const pagerTemplate = (page, pages) => html`
    <div class="col-md-12">
        ${page - 2 > 1 ? html`<a href="?page=1" class="page-index btn btn-info">First</a>` : null}
        ${page > 1 ? html`<a href=${`?page=${page - 1}`} class="page-index btn btn-info">&lt; Prev</a>` : null}        
        ${page - 2 < 1 ? null : html`<a href=${`?page=${page - 2}`} class="page-index btn btn-info">${page - 2}</a>`}
        ${page - 1 < 1 ? null : html`<a href=${`?page=${page - 2}`} class="page-index btn btn-info">${page - 1}</a>`}
        <a class="page-index btn btn-current-page">${page}</a>
        ${page + 1 <= pages ? html`<a href=${`?page=${page + 1}`} class="page-index btn btn-info">${page + 1}</a>` : null}
        ${page + 2 <= pages ? html`<a href=${`?page=${page + 2}`} class="page-index btn btn-info">${page + 2}</a>` : null}
        ${page < pages ? html`<a href=${`?page=${page + 1}`} class="page-index btn btn-info">Next &gt;</a>` : null}
        ${page + 2 < pages ? html`<a href=${`?page=${pages}`} class="page-index btn btn-info">Last</a>` : null}
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
    const query = parseQueryString(ctx.querystring);

    const page = (Number(query.page) || 1);
    const search = query.search || '';

    const userpage = ctx.pathname === '/my-furniture';

    ctx.render(catalogTemplate(loadProducts(userpage, page, search), loadPager(userpage, page, search), userpage, onSearch, search));

    function onSearch(event) {
        event.preventDefault();

        const searchParam = (new FormData(event.target)).get('search').trim();

        if (searchParam) {
            ctx.page.redirect(`/home?search=${searchParam}`);
        }
    }
}

async function loadProducts(userpage, page, search) {
    let products;

    if (userpage) {
        const userId = getUserData().id;
        products = await getAllProductsOfUserId(page, userId, search);
    } else {
        products = await getAllProducts(page, search);
    }
    return products.map(productCardTemplate);
}

async function loadPager(userpage, page, search) {
    let count;

    if (userpage) {
        const userId = getUserData().id;
        count = await getPagesCountOfUserProducts(userId, search);
    } else {
        count = await getPagesCount(search);
    }
    const pages = Math.ceil(count / pageSize);

    return pagerTemplate(page, pages);
}

export {
    catalogPage
}
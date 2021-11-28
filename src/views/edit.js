import {editProduct, getProductById} from "../api/data.js";
import {html, until} from "../lib.js";
import {createNewProductValidator} from "../util.js";


const editTemplate = (productPromise) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Create New Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        ${until(productPromise, html`<p>Loading &hellip;</p>`)}
`;

const formTemplate = (product, onSubmit, errorMsg, errors) => html`
    <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class=${'form-control' + (errors.make ? ' is-invalid' : ' is-valid')} id="new-make" type="text" name="make" value="${product.make}">
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class=${'form-control' + (errors.model ? ' is-invalid' : ' is-valid')} id="new-model" type="text" name="model" value="${product.model}">
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class=${'form-control' + (errors.year ? ' is-invalid' : ' is-valid')} id="new-year" type="number" name="year" value="${product.year}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class=${'form-control' + (errors.description ? ' is-invalid' : ' is-valid')} id="new-description" type="text" name="description" value="${product.description}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class=${'form-control' + (errors.price ? ' is-invalid' : ' is-valid')} id="new-price" type="number" name="price" value="${product.price}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class=${'form-control' + (errors.img ? ' is-invalid' : ' is-valid')} id="new-image" type="text" name="img" value="${product.img}">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value="${product.material}">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Edit" />
                </div>
            </div>
        </form>
`

function editPage(ctx) {
    const prodPromise = getProductById(ctx.params.id)
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(editTemplate(loadProduct(prodPromise, errorMsg, errors)));
    }

    async function loadProduct(prodPromise, errorMsg, errors) {
        const product = await prodPromise;
        return formTemplate(product, onSubmit, errorMsg, errors);
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        
        const make = formData.get('make');
        const model = formData.get('model');
        const year = Number(formData.get('year'));
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const img = formData.get('img');
        const material = formData.get('material');
        const isNotLegacy = true;

        try {
            const requiredFields = {
                make,
                model,
                year,
                description,
                price,
                img
            }
            
            createNewProductValidator(requiredFields);

            const prod = await prodPromise

            const newProduct = await editProduct(prod._id, {
                make,
                model,
                year,
                description,
                price,
                img,
                material,
                isNotLegacy
            });

            ctx.page.redirect(`/details/${newProduct._id}`);
        } catch (err) {
            const message = err.message || err.error.message
            update(message, err.errors || {});
        }
    }
}

export {
    editPage
}
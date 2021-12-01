import {isLogged, loadProduct, deleteProduct} from "./util.js";
import { page, render } from "./lib.js";
import {logout} from "./api/data.js";

import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";
import {detailsPage} from "./views/details.js";
import {editPage} from "./views/edit.js";
import {notify} from "./common/notify.js";


const root = document.getElementById('root');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext)
page('/home', catalogPage);
page('/', '/home');
page('/my-furniture', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/edit/:id', loadProduct, editPage)
page('/delete/:id', deleteProduct);
page('/details/:id', loadProduct, detailsPage);

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    if (isLogged()) {
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

async function onLogout() {
    notify(await logout());
    updateUserNav();
    page('/home');
}
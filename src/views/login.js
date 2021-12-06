import { html } from "/src/lib.js";

import { login } from "../api/data.js";


const loginTemplate = (onSubmit, errorMsg, errors) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    ${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${'form-control' + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${'form-control' + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`;

function loginPage(ctx) {
    update(null, {});

    function update(errorMsg, errors) {
        ctx.render(loginTemplate(onSubmit, errorMsg, errors));
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if(email === '' || password === '') {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        email: email === '',
                        password: password === ''
                    }
                }
            }
            await login(email, password);
            ctx.updateUserNav();
            ctx.page.redirect('/home');
        } catch (err) {
            const message = err.message || err.error.message
            update(message, err.errors || {});
        }
    }
}

export {
    loginPage
}
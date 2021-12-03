const element = document.createElement('div');
element.innerHTML = `
    <div id="overlay">
        <div id="modal">
            <p></p>
            <div>
                <button id="modal-ok">OK</button>
                <button id="modal-cancel">Cancel</button>
            </div>
        </div>
    </div>
`;

element.querySelector('#modal-ok').addEventListener('click', () => onChoice(true));
element.querySelector('#modal-cancel').addEventListener('click', () => onChoice(false));

const msg = element.querySelector('p');
let callback = null;

function showModal(message, cllbck) {
    callback = cllbck;
    msg.textContent = message;
    document.body.appendChild(element);
}

function onChoice(choice) {
    clear();
    callback(choice);
}

function clear() {
    element.remove();
}

export {
    showModal
}
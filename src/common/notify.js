const element = document.createElement('div');
element.id = 'notification';

const messageDiv = document.createElement('div');
messageDiv.id = 'notification-message';

const closeAnchor = document.createElement('a');
closeAnchor.id = 'notification-close';
closeAnchor.innerHTML = '&#10006;';
closeAnchor.href = 'javascript:void(0)';
closeAnchor.addEventListener('click', () => {
    element.remove();
})

element.appendChild(messageDiv);
element.appendChild(closeAnchor);

function notify(message) {
    messageDiv.textContent = message;
    document.body.appendChild(element);
}



export {
    notify
}
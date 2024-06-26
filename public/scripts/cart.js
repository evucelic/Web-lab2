function decreaseQuantity(productName){
    fetch("/cart/remove/" + productName, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        return fetch('/cart/getCart');
    }).then(response => response.json())
    .then(cart => {
        updateItemCart(productName, cart[productName]);
    })
    .catch(error => console.error('Error', error));
}

function updateItemCart(productName, count){
    const cartElement = document.querySelector(`.cart-element[cart-id="${productName}"]`);
    const cartName = document.querySelector(`p[cart-name="${productName}"]`)
    if (count > 0) {
        cartElement.querySelector('span').textContent = count;
    } else {
        cartElement.remove();
        cartName.remove();
    }
}

function increaseQuantity(productName) {
    fetch("/cart/add/" + productName, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        return fetch('/cart/getCart');
    }).then(response => response.json())
    .then(cart => {
        updateItemCart(productName, cart[productName]);
    })
    .catch(error => console.error('Error', error));
}

function removeItem(productName) {
    fetch("/cart/removeAll/" + productName, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        return fetch('/cart/getCart');
    }).then(response => response.json())
    .then(cart => {
        updateItemCart(productName, 0);
    })
    .catch(error => console.error('Error', error));
}
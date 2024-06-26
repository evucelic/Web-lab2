function addToCart(productName){
    fetch("/cart/add/" + productName, {
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(() => {
        return fetch('/cart/getCart');
    }).then(response => response.json())
    .then(cart => {
        updateCartCount(cart);
        updateItemCount(productName, cart[productName]);
    })
    .catch(error => console.error('Error', error));
}

function updateCartCount(cart){
    const cartCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
    try {
        document.querySelector('.cart-count').textContent = cartCount;
    } catch (error) {
        let el = document.createElement('span');
        el.className = 'cart-count';
        el.textContent = 1;
        const cart_container = document.querySelector('.cart_container');
        cart_container.appendChild(el);
    }
}

function updateItemCount(productName, count) {
    try{
        const itemCountElement = document.querySelector(`.image-container[product-id="${productName}"] .item-count`);
        itemCountElement.textContent = count; 
    }
    catch(error){
        let el = document.createElement('span');
        el.className = 'item-count';
        el.textContent = 1;
        const cont = document.querySelector(`.image-container[product-id="${productName}"]`);
        cont.appendChild(el);
    }
}
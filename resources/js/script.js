import data from './data.js'

const itemsContainer = document.getElementById('items');

const cart = [ ];

const itemList = document.getElementById('item-list');
const cartQty = document.getElementById("cart-qty");
const cartTotal = document.getElementById("cart-total");




for (let i = 0; i < data.length; ++i) {
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    let img = document.createElement('img');

    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)

    let description = document.createElement('P')
    description.innerText = data[i].desc
    newDiv.appendChild(description)

    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    itemsContainer.appendChild(newDiv)

}

const allItemsButton = Array.from(document.querySelectorAll("button"));
allItemsButton.forEach(elt => elt.addEventListener("click", () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))

//add item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i++){
        if (cart[i].name === name) {
            cart[i].qty++;
            return
        }
    }
    const item = {name: name, price: price, qty: 1}
    cart.push(item)
    showItems();
}

// show items
function showItems() {
    const qty = getQty()
    cartQty.innerHTML = `You have ${qty} items in your cart`;

    let itemStr = '';
    for (let i = 0; i < cart.length; i++) {
        const {name, price, qty} = cart[i];
        itemStr += `<li>
        ${name} 
        $${price} x ${qty} =
         $${qty * price}</li>`;
    }

    itemList.innerHTML = itemStr;
    
    const total = getTotal();
    cartTotal.innerHTML = `Total in cart: $${total}`;
}


//get quantity
function getQty() {
    let qty = 0;
    for (let i = 0; i < cart.length; i++) {
        qty += cart[i].qty
    }
    return qty;
}

    //get total
function getTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty
    } 
    return total.toFixed(2)
}

//remove item
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            showItems();
            return;
        }
    }
}

// data.forEach(parseItems);


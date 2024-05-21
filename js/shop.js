let iconCart = document.querySelector('.icon-cart');
let checkCart = document.querySelector('.check');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProduct = [];
let cart = [];
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
checkCart.addEventListener('click', () =>{
     body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProduct.length > 0){
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2><center>${product.name}</center></h2>
            <div class="price"><center>$${product.price}</center></div>
            <button class="addCart">
               <center>Add to cart</center> 
            </button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener('click', (event) =>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }] 
    } else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity =  cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    if(cart.length > 0){
        cart.forEach(cartItem => {
            let newCart = document.createElement('div');
            let positionProduct = listProduct.findIndex((value) => value.id == cartItem.product_id);  
            let info = listProduct[positionProduct];
            newCart.classList.add('item');
            newCart.innerHTML =`
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalprice">
                $${info.price * cartItem.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cartItem.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
            listCartHTML.appendChild(newCart);  
        })
    }
}

const initApp = () => {
    fetch('product.json')
    .then(response => response.json())
    .then(data =>{
        listProduct = data;
        addDataToHTML();
    })
}

initApp();
var products = [];
var cartProducts = [];

function createProduct(name, count, price) {
    return {name: name, count: count, price: price}
}

products.push(
    createProduct('product1', 4, 100),
    createProduct('product2', 3, 200),
    createProduct('product3', 2, 300),
    createProduct('product4', 1, 400),
)

cartProducts.push(
    createProduct('product1', 1, 100),
    createProduct('product2', 1, 200),
    createProduct('product3', 1, 300),
    createProduct('product4', 1, 400),
)


function onLoad() {

    var storageTable = document.getElementById('storage');

    for (var num = 0; num < products.length; num++) {
        var product = products[num];
        storageTable.innerHTML += 
        '<tr id="product' + num + '", onclick="putInCart(' + num + ')">' + 
        '<td>'+product.name+'</td>' + 
        '<td>'+product.count+'</td>' + 
        '<td>'+product.price+'</td>' + 
        '</tr>';
    }
}

function putInCart(num) {

    var cartTable = document.getElementById('cart');
    var cartProduct = document.getElementById('cartProduct'+num);

    if (cartProduct == null) {
        var tr = document.createElement("tr");

        tr.id = "cartProduct" + num;
        tr.innerHTML += 
        '<td>'+cartProducts[num]['name']+'</td>' + 
        '<td>'+cartProducts[num]['count']+'</td>' + 
        '<td>'+cartProducts[num]['price']+'</td>';
        cartTable.appendChild(tr);
    } else {
        
        var cartProd = cartProduct.getElementsByTagName("td")
        var prodCount = document.createElement("td")
        if (cartProducts[num]['count'] < products[num]['count']) {
            cartProducts[num]['count']++;
        }
        prodCount.innerHTML = cartProducts[num]['count'];
        cartProduct.replaceChild(prodCount, cartProd[1])
        
    }

    var product = document.getElementById('product'+num)
    var prod = product.getElementsByTagName("td")
    var count = document.createElement("td")
    count.innerHTML = products[num]['count'] - cartProducts[num]['count'];
    product.replaceChild(count, prod[1])
        
}

function putInStorage(num) {
    var storageTable = document.getElementById('storeage');
    var product = document.getElementById('product'+num);

    if (product == null) {
        var tr = document.createElement("tr");

        tr.id = "product" + num;
        tr.innerHTML += 
        '<td>'+products[num]['name']+'</td>' + 
        '<td>'+products[num]['count']+'</td>' + 
        '<td>'+products[num]['price']+'</td>';
        storageTable.appendChild(tr);
    } else {
        
        var prod = product.getElementsByTagName("td")
        var count = document.createElement("td")
        if (products[num]['count'] < cartProducts[num]['count']) {
            products[num]['count']++;
        }
        count.innerHTML = products[num]['count'];
        product.replaceChild(count, prod[1])
        
    }

    var cartProduct = document.getElementById('cartProduct'+num)
    var cartProd = cartProduct.getElementsByTagName("td")
    var cartCount = document.createElement("td")
    cartCount.innerHTML = cartProducts[num]['count'] - products[num]['count'];
    cartProduct.replaceChild(cartCount, cartProd[1])

}

function test() {
    alert('good');

};

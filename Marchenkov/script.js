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
    var product = document.getElementById('product'+ num);
    product.id = "cartProduct" + num;
    product.onclick = "putInStorage(" + num + ")";
    cartTable.appendChild(product);
}

function putInStorage(num) {
    var storageTable = document.getElementById('storage');
    var cartProduct = document.getElementById('cartProduct'+ num);
    cartProduct.onclick = "putInCart(" + num + ")";
    cartProduct.id = "product" + num;
    storageTable.appendChild(product);
}





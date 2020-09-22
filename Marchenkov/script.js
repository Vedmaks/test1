var storage = [];
var cart = [];

function createProduct(name, count, price) {
    return {name: name, count: count, price: price}
}


cart.push(
    createProduct('product1', 0, 100),
    createProduct('product2', 0, 200),
    createProduct('product3', 0, 300),
    createProduct('product4', 0, 400),
)


storage.push(
    createProduct('product1', 4, 100),
    createProduct('product2', 3, 200),
    createProduct('product3', 2, 300),
    createProduct('product4', 1, 400),
)

function onLoad() {
    
    var storageTable = document.getElementById('storage');

    for (var num = 0; num < storage.length; num++) {
        var product = storage[num];
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
        var tbody = document.createElement("tbody");
        tbody.innerHTML += 
        '<tr id="cartProduct' + num + '", onclick="putInStorage(' + num + ')">' + 
        '<td>'+storage[num].name+'</td>' + 
        '<td>'+(++cart[num].count)+'</td>' + 
        '<td>'+storage[num].price+'</td>' +
        '</tr>';
        cartTable.appendChild(tbody);
        storage[num]['count']--
    } else {
        
        var cartProd = cartProduct.getElementsByTagName("td")
        var prodCount = document.createElement("td")
        storage[num]['count']--
        cart[num]['count']++;
       
        
        prodCount.innerHTML = cart[num]['count'];
        cartProduct.replaceChild(prodCount, cartProd[1])
            
    }

    var product = document.getElementById('product'+num)
    var prod = product.getElementsByTagName("td")
    var count = document.createElement("td")
    count.innerHTML = storage[num]['count']
    product.replaceChild(count, prod[1])

    if (storage[num]['count'] == 0) {
        prod = document.getElementById('product'+num)
        stor = prod.parentNode;
        stor.removeChild(prod)
    }

}

function putInStorage(num) {
    
    
    var storageTable = document.getElementById('storage');
    var product = document.getElementById('product'+num);

    if (product == null) {

        var tbody = document.createElement("tbody");
        tbody.innerHTML += 
        '<tr id="product' + num + '", onclick="putInCart(' + num + ')">' + 
        '<td>'+storage[num].name+'</td>' + 
        '<td>'+(++storage[num].count)+'</td>' + 
        '<td>'+storage[num].price+'</td>' +
        '</tr>';
        storageTable.appendChild(tbody);
        cart[num]['count']--;

    } else {
        
        var prod = product.getElementsByTagName("td")
        var count = document.createElement("td")
        storage[num]['count']++;
        cart[num]['count']--;
        
        count.innerHTML = storage[num]['count'];
        product.replaceChild(count, prod[1])
         
    }

    var cartProduct = document.getElementById('cartProduct'+num)
    var cartProd = cartProduct.getElementsByTagName("td")
    var cartCount = document.createElement("td")
    cartCount.innerHTML = cart[num]['count'];
    cartProduct.replaceChild(cartCount, cartProd[1])

    if (cart[num]['count'] == 0) {
        prod = document.getElementById('cartProduct'+num)
        cart = prod.parentNode;
        cart.removeChild(prod)
    }

}

function test() {
    alert('good');

};

var stor = [];
var cart = [];

function createProduct(name, count, price) {
    return {name: name, count: count, price: price}
}

stor.push(
    createProduct('product1', 4, 100),
    createProduct('product2', 3, 200),
    createProduct('product3', 2, 300),
    createProduct('product4', 1, 400),
)

function onLoad() {
    
    var storageTable = document.getElementById('stor');

    for (var num = 0; num < stor.length; num++) {
        var product = stor[num];
        var row = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        td1.innerHTML = product.name
        td2.innerHTML = product.count
        td3.innerHTML = product.price
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.id = 'stor' + num
        storageTable.appendChild(row)
        row.addEventListener('click', handler)
    }

    for (var i = 0; i < stor.length; i++) {
        cart.push(createProduct('', 0, 0));
    
    }

}

function handler() {
    if (this.id.slice(0,4) == 'cart') {
        putInstorage(this.id.slice(4))
    } else {
        putIncart(this.id.slice(4))
    }
}

function main(c, s, num) {
    var a
    var b

    if (c == 'cart') {
        a = cart
        b = stor
    } else {
        b = cart
        a = stor
    }
    
    var table = document.getElementById(c);
    var product = document.getElementById(c+num);

    if (product == null) {
        
        var row = document.createElement('tr')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        td1.innerHTML = stor[num].name
        td2.innerHTML = (++a[num].count)
        td3.innerHTML = stor[num].price
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)
        row.id = c + num
        table.appendChild(row)
        row.addEventListener('click', handler)
        
        b[num].count--
    } else {
        
        var prod = product.getElementsByTagName("td")
        var count = document.createElement("td")
        b[num].count--
        a[num].count++;
        
        count.innerHTML = a[num].count;
        product.replaceChild(count, prod[1])
            
    }

    var sproduct = document.getElementById(s+num)
    var sprod = sproduct.getElementsByTagName("td")
    var scount = document.createElement("td")
    scount.innerHTML = b[num].count
    sproduct.replaceChild(scount, sprod[1])

    if (b[num].count == 0) {
        prod = document.getElementById(s+num)
        parent = prod.parentNode;
        parent.removeChild(prod)
    }

    getSum();
}

function putIncart(n) {

    main('cart', 'stor', n); 
}

function putInstorage(n) {

    main('stor', 'cart', n);    
}

function getSum() {
    var sum = 0
    for (var i = 0; i < cart.length; i++) {
        sum += (cart[i].count * stor[i].price)
    }
        
    var summ = document.getElementById('sum')
    summ.innerHTML = 'Сумма: ' + sum
}

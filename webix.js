var storData = [];
var sum = 0;

function createProduct(name, count, price) {
    return {id: name, name: name, count: count, price: price}
}

storData.push(
    createProduct('product1', 4, 100),
    createProduct('product2', 3, 200),
    createProduct('product3', 2, 300),
    createProduct('product4', 1, 400),
)

function getSum() {

    var a = $$("sum")
    a.setHTML("Cумма: " + sum)
    
}

function addCart(id) {
    var item = this.getItem(id);
    var cart = $$("cart");
    var cartItem = cart.getItem(id);
    
    if (item.count > 0) {
        item.count--
        this.updateItem(id, item)
   

        if (cart.exists(id)) {
            
            cartItem.count++
            cart.updateItem(id, cartItem)
            sum += cartItem.price

        } else {
            cart.add({id: item.id, name: item.name, count: 1, price: item.price})
            sum += item.price
        }
    } 
    
    if(item.count == 0) {
        this.remove(id)
    }

    getSum()

}

function addStor(id) {
    var item = this.getItem(id);
    var stor = $$("stor");
    var storItem = stor.getItem(id);
    
    if (item.count > 0) {
        item.count--
        this.updateItem(id, item)
   

        if (stor.exists(id)) {
            
            storItem.count++
            stor.updateItem(id, storItem)
            sum -= storItem.price

        } else {
            stor.add({id: item.id, name: item.name, count: 1, price: item.price})
            sum -= (item.price)
        }
    } 
    
    if(item.count == 0) {
        this.remove(id)
    }

    getSum()

}

function addNew() {
    
    var values = $$("addForm").getValues();
    var stor = $$("stor");
    if ($$("addForm").validate()) {
        
        if (stor.exists(values.name)) {
            var elem = stor.getItem(values.name)  
            elem.count += parseInt(values.count) 
            elem.price = parseInt(values.price)
            stor.updateItem(values.name, elem)
            
        } else {
            stor.add({id: values.name, name: values.name, count: parseInt(values.count), price: parseInt(values.price)});   
        }
        
        $$("addForm").clear();
    } else {  webix.message({ type:"error", text:"Заполняй нормально!!! Количество и цена - числа!" }); }
}

webix.ui({ id: "test",
    
    cols:[
        { rows:[
            { type:"header", template:"Склад"},
            { id: "stor", view:"datatable", on:{"onItemClick": addCart}, autowidth:true, scroll:false,
                columns:[
                    { id:"name", name: "name", header:"Товар", sort:"string"},
                    { id:"count", name: "count", header:"Количество", sort:"int"},
                    { id:"price", name: "price", header:"Цена", sort:"int"},
                    
                ],
                data: storData
            },
                            
        ]},
        { rows:[
            { type:"header", template:"Корзина" },
            { id: "cart", view:"datatable", on:{"onItemClick": addStor}, autowidth:true, scroll:false,
                columns:[
                    { id:"name", name: "name", header:"Товар", sort:"string"},
                    { id:"count", name: "count", header:"Количество", sort:"int"},
                    { id:"price", name: "price", header:"Цена", sort:"int"},
                ],
            
            },
            { view: "template", id: "sum", type:"header", template:"Сумма:" },
        ]},
        {view:"form", id:"addForm", autowidth:true,
        elements:[
            { type:"header", template:"Добавить товар" },
            { view:"text", name: "name", label:"Название" },
            { view:"text", name: "count", label:"Кол-во" },
            { view:"text", name: "price", label:"Цена" },
            {cols:[
                { view:"button", value:"Добавить", css:"webix_primary", click: addNew }
            ]}
        ],
        rules:{
            "count":webix.rules.isNumber,
            "price":webix.rules.isNumber,
            "name":webix.rules.isNotEmpty,
        }
    }
    ],
    
    
});



var products = [];
var deliveries = [];
var orders = [];

var product1 = {
	"name": "TV set",
	"price": 700,
	"description": "description1",
	"active": true
}

var product2 = {
	"name": "Refrigerator",
	"price": 500,
	"description": "description2",
	"active": true
}

var product3 = {
	"name": "Bicycle",
	"price": 250,
	"description": "description3",
	"active": true
}

var delivery1 = {
	"id": 0,
	"addressName": "Address1", 
	"address": "c50c8a48fbeae4d12c9a286bd877e70b15684a23"
}

var delivery2 = {
	"id": 0,
	"addressName": "Address2", 
	"address": "c9c82b77563a81a9bf5010ed368e5eacf2a9f4c3"
}

var delivery3 = {
	"id": 0,
	"addressName": "Address3", 
	"address": "01120ae2b277cf3dfe59ccd2f16edcef157f7023"
}

var order1 = {
	"id": 0,
	"buyer": "Buyer1",
	"destination": "Destination1", 
	"code": "qweqwe"
}

products.push(product1);
products.push(product2);
products.push(product3);

deliveries.push(delivery1);
deliveries.push(delivery2);
deliveries.push(delivery3);

orders.push(order1);

function Contract() {
    var contract = this;
    contract.at = function (wallet) {
        return new Shop();
    }
}

function Web3() {
    var web3 = this;
    web3.currentProvider = function () {}
    web3.providers = {
        HttpProvider: function(address) {
            return {};
        }
    }

    web3.eth = {
        contract : function(abi) {
            return new Contract();
        }
    }
	
	web3.toAscii = function(str) {
        return str;
    }
	
	web3.sha3 = function (str) {
        return str;
    }
}

function Shop() {
    var shop = this;

    shop.isAdmin = function (callback) {
		window.location.href.match(/\?admin$/) ? callback(false, true) : callback(false, false);
    }

    shop.addProduct = function (name, price, description, active, callback) {
        products[products.length] = {"id": products.length-1, "name":name, "price":price, "description":description, "active": true};
        callback(null, "ok");
    }

    shop.addDelivery = function (address, addressName, callback) {
		deliveries[deliveries.length] = {"id": deliveries.length-1, "addressName": addressName, "address": address};
		callback(null, "ok");
	}

    shop.deactivate = function (id, callback){
        products[id].active = false;
		callback(false, "ok");
    }
	
	shop.activate = function (id, callback){
        products[id].active = true;
		callback(false, "ok");
    }

    shop.order = function (id, destination, code, qwer, callback) {
        orders[orders.length] = {"id":orders.length-1,"destination":destination, "code":code};
        callback(null, "Success!");
    }

    shop.productsLength = function (callback) {
        var result = {"c":[products.length]};
        callback(null, result);
    }

    shop.products = function (i, callback) {
        var result = [{"c":[i]}, products[i].name,{"c":[products[i].price]},products[i].description, products[i].active];
        callback(null, result);
    }

    shop.deliveryLength = function (callback) {
		var result = {"c": [deliveries.length]};
		callback(null, result)
	}

    shop.delivery = function (i, callback) {
		var result = deliveries[i];
		callback(null, result)
	}

    shop.ordersLength = function (callback) {
		var result = {"c": [orders.length]};
        callback(null, result);
	}

    shop.lastOrder = function (callback) {
		var result = {"c": [orders[orders.length-1].id]};
        callback(null, result);
	}

    shop.orders = function (lastOrder, callback) {
		var result = [{"c": [orders.length]}, {"c": [orders[orders.length-1].id]}, orders[orders.length-1].buyer, orders[orders.length-1].destination];
		callback(null, result)
	}

    shop.assign = function (address, callback) {
		callback(null, "Success!")
	}
}
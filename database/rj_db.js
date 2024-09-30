class Customers {
    constructor(id, loginId, firstname, lastname, email, phone, address, latitude, longitude) {
        this.id = id;
        this.loginId = loginId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    updateProfile(firstname, lastname, email, phone, address) {
        if (firstname) this.firstname = firstname;
        if (lastname) this.lastname = lastname;
        if (email) this.email = email;
        if (phone) this.phone = phone;
        if (address) this.address = address;
    }

    updateLocation(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class Sales {
    constructor(id, price, saleDate, paymentDetails) {
        this.id = id;
        this.price = price;
        this.saleDate = saleDate;
        this.paymentDetails = paymentDetails;
    }

    updatePaymentDetails(newPaymentDetails) {
        this.paymentDetails = newPaymentDetails;
    }

    calculateTotalPrice(salesProducts) {
        this.price = salesProducts.reduce((total, sp) => total + sp.price, 0);
    }
}

class SalesProducts {
    constructor(id, salesId, productId, quantity, price) {
        this.id = id;
        this.salesId = salesId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
        this.updatePrice();
    }

    updatePrice() {
        
    }
}

class Orders {
    constructor(id, price, orderDate, paymentDetails) {
        this.id = id;
        this.price = price;
        this.orderDate = orderDate;
        this.paymentDetails = paymentDetails;
    }

    updatePaymentDetails(newPaymentDetails) {
        this.paymentDetails = newPaymentDetails;
    }

    calculateTotalPrice(orderProducts) {
        this.price = orderProducts.reduce((total, op) => total + op.price, 0);
    }
}

class OrdersProducts {
    constructor(id, orderId, productId, quantity, price) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    updateQuantity(newQuantity) {
        this.quantity = newQuantity;
        this.updatePrice();
    }

    updatePrice() {
        
    }
}

class Balance {
    constructor(id, balance, timestamp) {
        this.id = id;
        this.balance = balance;
        this.timestamp = timestamp;
    }

    updateBalance(amount) {
        this.balance += amount;
        this.timestamp = new Date();
    }

    setBalance(newBalance) {
        this.balance = newBalance;
        this.timestamp = new Date();
    }
}
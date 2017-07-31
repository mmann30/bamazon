var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log("Welcome to Bamazon");
    storeFront();
});

// Console logs the bamazon.products table
function storeFront() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Item # " + res[i].item_id + 
                " " + res[i].product_name +
                " Qty: " + res[i].stock_quantity + 
                " Price: $" + res[i].price 
            );
        }
        purchaseReqeust();
    });
}

// Prompts user 
function purchaseReqeust() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What item would you like to buy? (type item number)"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to buy?"
            }
        ]).then(function(res) {
            checkInv(res.product, res.quantity);
        });
}

// checks the inventory for sufficient quantity to process the request
function checkInv(itemId, orderQty) {
    // gets inventory quantity
    var query = "SELECT * FROM products WHERE item_id = ?";
    connection.query(query, [itemId], function(err, res) {
        if (orderQty <= res[0].stock_quantity){
            processOrder(res[0].stock_quantity, orderQty, itemId);
            calcTotal(itemId, res[0].price, orderQty);
        } else {
            console.log("Sorry our inventory is too low to complete this order.");
            exitMenu();
        }
    });
}

function processOrder(invQty, orderQty, itemId) {
    var newInv = invQty - orderQty;
    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
    connection.query(query, [newInv, itemId ], function(err, res) {
        if (err) throw err;
        console.log("Congratulations your order was successful!");
        exitMenu();
    })
}

// calculates total cost of order
function calcTotal(itemId, itemPrice, orderQty) {
        var total = orderQty * itemPrice;
        console.log("Total Cost is $" + total.toFixed(2));
}

function exitMenu(){
    inquirer
        .prompt({
            name: "exit",
            type: "list",
            message: "Would you like to purchase something else?",
            choices: ["Yes, take me back to the store front", "No, exit"]
        }).then(function(res) {
            if (res.exit === "Yes, take me back to the store front"){
                storeFront();
            } else {
                console.log("Thank you for shopping with Bamazon!");
                connection.end();
            }
        });
}



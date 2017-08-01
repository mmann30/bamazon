
Bamazon is a store front type Node.js application that interacts with an inventory maintained in a MySQL database.  

Running the CLI program the user is greeted with the store contents and is offered the option to purchase on the listed items.  
![store front](/images/bamazon1.png)

Once the item is chosen the user is prompted with the quantity they would like to buy.
![quantity selected](/images/bamazon2.png)

If there are enough units in stock then a successful transaction is made and the user is prompted with the total cost of the purchase calculated from the item price and quantity purchased.
![successful transaction](/images/bamazon3.png)

The database is updated to reflect the transaction by decreasing the stock quantity of the purchased item.
![updated store front](/images/bamazon4.png)

If the user attempts to purchase more units than are in stock warning message is displayed.
![unsuccessful transaction](/images/bamazon5.png)

The user is greeted when exiting the store.
![store exit](/images/bamazon6.png)


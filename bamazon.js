var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "jackblack1",
    database: "bamazon"
  });
  connection.connect(function(err) {
    if (err) throw err;
    populate();
    runSearch();
  });
  function populate() {
      var query = "SELECT * FROM products";
      connection.query(query, function(err,res){
      //  for(var i = 0; i > res.length; i++)    
        console.log(res);
      });

  }
  function runSearch() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err,res){
    inquirer
      .prompt({
        name: "buy",
        type: "input",
        message: "Welcome to bamazon my guy, select the ID of the product you would like to purchase.",
     },{
         name: "amount",
         type: "input",
         message: "How Many of those would you like?"

     }).then(function(answer){
    
     connection.query("update products set ? where ?",
    [ {
         stock_quanity: res.answer.stock_quanity
     },
     {
         id: answer.buy
     }]
    
     , function(err,res){
         if (err) throw err;
         
         console.log("Your purchasse was a success");

    connection.query("SELECT stock_quanity * price", function(err,res){
        if(err) throw err;
        console.log(res + " is your total");
    });
        
     });
     });
    });
}
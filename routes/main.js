// Create a new router
const express = require("express");
const validator = require('validator');
const router = express.Router();

// Define our data
var shopData = {shopName: "Bob's Beers", 
    productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"],
    shopLocations:["Ilford, IG1 1AA, Manager: Bob Ali", "Whitechapel, E1 1AA, Manager: Zaid Shaikh", "East Ham, E12 1AA, Manager: Essam AlJohani"],}


// Handle the main routes
router.get("/", (req, res) => {
    res.render("index.ejs", shopData)
}); 

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData)
});

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData)
});

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);
 });

 router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
router.post("/registered", (req,res) => {
    const { first, last, email } = req.body;
    //email validator
    if (!validator.isEmail(email)) {
        res.send("Invalid email address. Please try again.");
      } else {
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered! We will send an email to you at '+ req.body.email);
      }
}); 

// SURVEY — show the form
router.get('/survey', (req, res) => {
  // Passing shopData so survey.ejs can loop productCategories
  res.render('survey.ejs', shopData);
});

// SURVEY — handle submission and show results
router.post('/survey', (req, res) => {
  const { firstName, surname, email, age, drinkCategory, isStudent } = req.body;

  const data = {
    firstName,
    surname,
    email,
    age,
    drinkCategory,
    isStudent: !!isStudent, // checkbox returns undefined or "yes" — make it a boolean
  };

  // Keep shop data available
  res.render('survey-result.ejs', { ...shopData, data });
});

// Export the router object so index.js can access it
module.exports = router;


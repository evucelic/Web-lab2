const express = require("express");
const router = express.Router();
const data = require('../data/data');

router.get("/getCategories", (req, res) => {
    const categories = data.categories.map(category => ({ name: category.name }));
    return res.render("home", {
        session: req.session,
        categories: categories,
        categoryParent: "Izaberi kategoriju",
        products: [],
        
    });
});

router.get("/getProducts/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    const category = data.categories.find(cat => cat.name === categoryName);

    if (category) {
        return res.render("home", {
            session: req.session,
            categories: data.categories.map(category => ({ name: category.name })),
            categoryParent: category.name,
            products: category.products
        });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;

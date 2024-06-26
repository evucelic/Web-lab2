const express = require("express");
const router = express.Router();

router.post('/add/:productName', (req, res, next) => {
    const productName = req.params.productName;
    if (!req.session.cart) {
        req.session.cart = {};
    }
    if (req.session.cart[productName]) {
        req.session.cart[productName]++;
    } else {
        req.session.cart[productName] = 1;
    }
    return res.sendStatus(204);
});

router.post('/remove/:productName', (req, res, next) => {
    const productName = req.params.productName;
    if (req.session.cart && req.session.cart[productName]) {
        req.session.cart[productName]--;
        if (req.session.cart[productName] <= 0) {
            delete req.session.cart[productName];
        }
    }
    return res.sendStatus(204);
});

router.post('/removeAll/:productName', (req, res, next) => {
    const productName = req.params.productName;
    if (req.session.cart && req.session.cart[productName]) {
        delete req.session.cart[productName];
    }
    return res.sendStatus(204);
});

router.get('/getAll', (req, res) => {
    return res.render("cart", {
        cart: req.session.cart || {},
    });
});

router.get('/getCart', (req, res) => {
    res.json(req.session.cart || {});
});

module.exports = router;

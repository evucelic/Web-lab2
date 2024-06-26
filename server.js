const express = require('express');
const session = require('express-session');
var path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: '1234567890',
    resave: false,
    saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const homeRoutes = require('./routes/home.routes');
const cartRoutes = require('./routes/cart.routes');

app.use('/home', homeRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
    res.redirect('/home/getCategories');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

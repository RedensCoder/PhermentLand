const express = require("express");
const bodyParser = require("body-parser");
const {config} = require("dotenv");

const { CreatePayment, GetPayments, Notice } = require("./handlers/yookassa.js")
const {authenticateToken} = require("./services/jwt");

const app = express();

const user = require("./handlers/user");
const balance = require("./handlers/balance");
const products = require("./handlers/products");

config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/files', express.static('files'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", ["Content-Type", "Access-Control-Allow-Credentials", "Authorization", "Accept-Encoding"]);
    next();
});

app.use("/user", user);
app.use("/balance", balance);
app.use("/products", products);

// MoneyMoneyMoney
app.post("/createOrder", authenticateToken, async (req, res) => CreatePayment(req, res) );
app.get("/getOrders", authenticateToken, async (req, res) => GetPayments(req, res) );
app.get("/notice", authenticateToken, async (req, res) => Notice(req, res) );

app.listen("8080", () => {
    console.log("Server started!");
})
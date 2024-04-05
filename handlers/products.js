const express = require("express");
const router = express.Router();
const { prisma } = require("../services/client");

router.get("/getAll", async (req, res) => {
    const products = await prisma.Products.findMany();

    res.send(JSON.stringify(
        products, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
});

module.exports = router;
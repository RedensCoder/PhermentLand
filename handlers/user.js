const express = require("express");
const router = express.Router();
const { prisma } = require("../services/client");
const md5 = require("md5");
const {generateAccessToken, authenticateParamsToken} = require("../services/jwt");
const generator = require('creditcard-generator')

router.post("/create", async (req, res) => {
    if (!req.body.nickname || !req.body.password || !req.body.mail) {
        res.sendStatus(204);
        return;
    }

    const user = await prisma.Users.findFirst( { where: { nickname: req.body.nickname } } );

    if (user !== null) {
        return res.status(400).send("Пользователь с таким никнеймом уже есть!");
    }

    const mail = await prisma.Users.findFirst( { where: { mail: req.body.mail } } );

    if (mail !== null) {
        return res.status(400).send("Пользователь с такой почтой уже есть!");
    }

    const newUser = await prisma.Users.create({
        data: {
            nickname: req.body.nickname,
            password: md5(req.body.password),
            mail: req.body.mail,
            access: true,
            status: null
        }
    });

    const cardNum = generator.GenCC();

    await prisma.User_balances.create({
        data: {
            userId: newUser.id,
            card: cardNum.toString(),
            balance: 0,
        }
    });

    const token = generateAccessToken(Number(newUser.id), req.body.nickname);

    res.send(token);
});

router.post("/auth", async (req, res) => {
    if (!req.body.nickname || !req.body.password) {
        res.sendStatus(204);
        return;
    }

    const user = await prisma.Users.findFirst( { where: { AND: { nickname: req.body.nickname, password: md5(req.body.password) } } } );

    if (user === null) {
        return res.status(400).send("Пользователь не зарегистрирован!");
    }

    const token = generateAccessToken(Number(user.id), req.body.nickname);

    res.send(token);
});

router.get("/getById/:id", authenticateParamsToken, async (req, res) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const user = await prisma.Users.findFirst( { where: { id: Number(req.params.id) } } );

    if (user === null) {
        return res.sendStatus(400);
    }

    res.send(JSON.stringify(
        user, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
});

router.get("/getBalanceById/:id", authenticateParamsToken, async (req, res) => {
    if (!Number.isInteger(Number(req.params.id))) {
        return res.sendStatus(400)
    }

    const user = await prisma.User_balances.findFirst( { where: { userId: Number(req.params.id) } } );

    if (user === null) {
        return res.sendStatus(400);
    }

    res.send(JSON.stringify(
        user, (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    ));
});

module.exports = router;
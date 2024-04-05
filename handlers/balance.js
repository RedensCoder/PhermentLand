const express = require("express");
const router = express.Router();
const { prisma } = require("../services/client");
const {authenticateBodyToken, authenticateParamsToken} = require("../services/jwt");

router.post("/put", async (req, res) => {
    if (!req.body.userId || !req.body.amount) {
        return res.sendStatus(204);
    }

    const userBalance = await prisma.User_balances.findFirst({ where: { userId: req.body.userId } });

    if (userBalance.balance < req.body.amount) {
        return res.send("Недостаточно средств!");
    }

    await prisma.user_balances.update({
        where: { userId: req.body.userId }.userId,
        data: {
            balance: { increment: req.body.amount }
        }
    });

    res.send(200);
});

router.post("/withdraw", async (req, res) => {
    if (!req.body.userId || !req.body.amount) {
        return res.sendStatus(204);
    }

    await prisma.user_balances.update({
        where: { userId: req.body.userId }.userId,
        data: {
            balance: { decrement: req.body.amount }
        }
    });

    res.send(200);
});

router.post("/transaction", authenticateBodyToken, async (req, res) => {
    if (!req.body.userId || !req.body.recipientId || !req.body.amount) {
        return res.sendStatus(204);
    }

    const recipient = await prisma.User_balances.findFirst({ where: { userId: req.body.recipientId } });
    const userBalance = await prisma.User_balances.findFirst({ where: { userId: req.body.userId } });

    if (recipient === null) {
        return res.send("Пользователь не найден!");
    }

    if (userBalance.balance < req.body.amount) {
        return res.send("Недостаточно средств!");
    }

    await prisma.User_balances.update({
        where: { userId: recipient.userId },
        data: {
            balance: { increment: req.body.amount }
        }
    })

    await prisma.Balance_histories.create({
       data: {
           balanceId: recipient.id,
           type: "add",
           amount: req.body.amount,
           recipientId: userBalance.userId
       }
    });

    await prisma.User_balances.update({
        where: { userId: userBalance.userId },
        data: {
            balance: { decrement: req.body.amount }
        }
    })

    await prisma.Balance_histories.create({
        data: {
            balanceId: userBalance.id,
            type: "remove",
            amount: req.body.amount,
            recipientId: recipient.userId
        }
    });

    res.send(200);
});

router.get("/getUserBalance/:id", authenticateParamsToken, async (req, res) => {
    const balance = await prisma.User_balances.findFirst({ where: { userId: req.params.id } })

    res.send(balance);
});

router.get("/getUserTransaction/:id", authenticateParamsToken, async (req, res) => {
    const history = await prisma.Balance_histories.findFirst({ where: { balanceId: req.params.id } })

    res.send(history);
});

module.exports = router;
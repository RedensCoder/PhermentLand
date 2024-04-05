const { YooCheckout } = require("@a2seven/yoo-checkout");
const {config} = require("dotenv");
const {v4} = require("uuid");
const { prisma } = require("../services/client");

const { access, privilegeMonth, privilegeYear, unban } = require("./minecraft.js");

config();

const checkout = new YooCheckout({ shopId: process.env.shopId, secretKey: process.env.secretKey });

exports.CreatePayment = async (req, res) => {
    if (!req.body.summ || !req.body.items || !req.body.email || !req.body.data) {
        res.sendStatus(204);
        return;
    }

    const createPayload = {
        amount: {
            value: `${req.body.summ}.00`,
            currency: 'RUB'
        },
        capture: true,
        confirmation: {
            type: "redirect",
            return_url: "https://phermentland.ru/success"
        },
        receipt: {
            customer: {
                email: req.body.email
            },
            items: req.body.items
        },
        metadata: req.body.data
    };

    try {
        const payment = await checkout.createPayment(createPayload, v4());
        res.send(payment);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

exports.GetPayments = async (req, res) => {
    const filter = {
        limit: 5
    }

    try {
        const paymentList = await checkout.getPaymentList(filter);
        res.send(paymentList.items)
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}

exports.Notice = async (req, res) => {
    try {
        const paymentList = await checkout.getPaymentList({limit: 5});

        for (const el of paymentList.items) {
            if (el.status === "succeeded") {
                if (el.metadata.product === "access") {
                    await access(el.metadata.nickname)
                    await prisma.Users.update({
                        where: { nickname: el.metadata.nickname },
                        data: {
                            access: true
                        }
                    })
                } else if (el.metadata.product === "unban") {
                    await unban(el.metadata.nickname);
                } else if (el.metadata.time === "month") {
                    await privilegeMonth(el.metadata.product, el.metadata.nickname)
                    await prisma.Users.update({
                        where: { nickname: el.metadata.nickname },
                        data: {
                            status: el.metadata.product
                        }
                    })
                } else if (el.metadata.time === "year") {
                    await privilegeYear(el.metadata.product, el.metadata.nickname)
                    await prisma.Users.update({
                        where: { nickname: el.metadata.nickname },
                        data: {
                            status: el.metadata.product
                        }
                    })
                }
            }
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}
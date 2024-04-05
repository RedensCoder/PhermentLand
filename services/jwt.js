const jwt = require("jsonwebtoken");
const {config} = require("dotenv");
config();

exports.generateAccessToken = (id, nickname) => {
    return jwt.sign({
        data: {
            id: id,
            nickname: nickname,
        }
    }, process.env.SECRET_TOKEN, {expiresIn: "7d"});
}

exports.authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

exports.authenticateParamsToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403)

        if (decoded.data.id.toString() !== req.params.id.toString()) return res.sendStatus(403);
        next()
    })
}

exports.authenticateBodyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) return res.sendStatus(403)

        if (decoded.data.id.toString() !== req.body.userId.toString()) return res.sendStatus(403);
        next()
    })
}
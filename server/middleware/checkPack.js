// middleware/checkPack.js
function checkPack(req, res, next) {
    const { pack } = req.body;

    if (typeof pack !== "number" || pack <= 0) {
        return res.status(400).json({
            error: "Pack must be greater than 0."
        });
    }

    next();
}

module.exports = checkPack;
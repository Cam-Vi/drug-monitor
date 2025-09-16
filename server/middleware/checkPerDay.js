// middleware/checkPerDay.js
function checkPerDay(req, res, next) {
    const { perDay } = req.body;

    if (typeof perDay !== "number" || perDay <= 0 || perDay >= 90) {
        return res.status(400).json({
            error: "PerDay must be greater than 0 and less than 90."
        });
    }

    next();
}

module.exports = checkPerDay;
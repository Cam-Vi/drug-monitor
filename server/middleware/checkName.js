// middleware/checkName.js
function checkName(req, res, next) {
    const { name } = req.body;

    // Nếu không có name hoặc độ dài <= 5 thì báo lỗi
    if (!name || name.length <= 5) {
        return res.status(400).json({
            error: "Drug name must be longer than 5 characters"
        });
    }

    // Nếu hợp lệ => cho phép đi tiếp
    next();
}

module.exports = checkName;
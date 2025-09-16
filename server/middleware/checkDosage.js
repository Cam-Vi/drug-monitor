// middleware/checkDosage.js
function checkDosage(req, res, next) {
    const { dosage } = req.body;

    if (!dosage) {
        return res.status(400).json({
            error: "Dosage is required"
        });
    }

    // Regex kiểm tra format: 1-2 chữ số + "-morning/afternoon/night", 3 phần cách nhau bằng dấu ,
    const regex = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;

    if (!regex.test(dosage)) {
        return res.status(400).json({
            error: "Dosage must follow the format: XX-morning,XX-afternoon,XX-night"
        });
    }

    next(); // hợp lệ, tiếp tục
}

module.exports = checkDosage;
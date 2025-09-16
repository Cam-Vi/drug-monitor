function validateDrug(req, res, next) {
    const { name, dosage, card, pack, perDay } = req.body;

    // Debug: in ra dữ liệu nhận được
    console.log("DEBUG req.body:", req.body);

    // 1. Kiểm tra name > 5
    if (!name || name.trim().length <= 5) {
        return res.status(400).json({ error: "Name must be longer than 5 characters." });
    }

    // 2. Kiểm tra dosage
    const dosageRegex = /^\d{1,2}-morning,\d{1,2}-afternoon,\d{1,2}-night$/;
    if (!dosage || !dosageRegex.test(dosage.trim())) {
        return res.status(400).json({ error: "Dosage must follow format XX-morning,XX-afternoon,XX-night." });
    }

    // 3. Ép kiểu số, tránh undefined hoặc rỗng
    const cardNum = card ? Number(card) : 0;
    const packNum = pack ? Number(pack) : 0;
    const perDayNum = perDay ? Number(perDay) : 0;

    console.log("DEBUG numbers:", { cardNum, packNum, perDayNum });

    // 4. Kiểm tra các giá trị số
    if (isNaN(cardNum) || cardNum <= 1000) {
        return res.status(400).json({ error: "Card must be a number greater than 1000." });
    }

    if (isNaN(packNum) || packNum <= 0) {
        return res.status(400).json({ error: "Pack must be a number greater than 0." });
    }

    if (isNaN(perDayNum) || perDayNum <= 0 || perDayNum >= 90) {
        return res.status(400).json({ error: "PerDay must be a number greater than 0 and less than 90." });
    }

    // 5. Gán lại giá trị số cho controller
    req.body.card = cardNum;
    req.body.pack = packNum;
    req.body.perDay = perDayNum;

    next();
}

module.exports = validateDrug;
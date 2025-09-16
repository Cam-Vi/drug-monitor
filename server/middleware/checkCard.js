function checkCard(req, res, next) {
    const cardValue = Number(req.body.card); // ép kiểu number
    if (isNaN(cardValue) || cardValue <= 1000) {
        return res.render('add-drug', { error: 'Card must be >1000', data: req.body });
    }
    req.body.card = cardValue;
    next();
}
module.exports = checkCard;
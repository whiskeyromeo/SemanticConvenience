
const express = require('express');
var router = express.Router();


router.get('/upcoming', (req, res) => {
    res.status(200).send({ message: 'Successful return' })
});

router.get('/archive', (req, res) => {
    res.status(200).send({ message: 'Successful return' })
});

module.exports = router;
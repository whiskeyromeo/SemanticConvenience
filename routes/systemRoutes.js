const express = require('express');
const router = express.Router();
const fileManager = require('../fileManager');


router.post('/createFile', (req, res) => {
    console.log('createFile Hit: ', req.body);
    res.send(req.body);
    fileManager.appendFile(req.body);
});

router.post('/createDirectory', (req, res) => {
    console.log('createDirectory Hit: ', req.body);
    fileManager.createDirectory(req.body);
});

module.exports = router;
const express = require('express');
var router = express.Router();

router.get('/*?', function (req, res) {
    res.render(`partials/${req.params[0]}`, { layout: false }, (err, html) => {
        if (err)  {
            res.status(404).send('WAT? No partial by that route');
        } else {
            res.send(html);
        }
    });
});



module.exports = router;
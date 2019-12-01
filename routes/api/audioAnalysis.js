const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const payload = req;
    res.send("payload: " + payload);
});

module.exports = router;
const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.send('beach blog')
})


module.exports = router;
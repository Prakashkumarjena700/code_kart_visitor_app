const express = require('express')
const { createEntryRequest, updateEntryRequest, getAllRequest } = require('../controller/entryRequestController')
const { auth } = require('../middleware/auth.middleware')

const router = express.Router()

router.use(auth)
router.get('/', getAllRequest)
router.post('/create-request', createEntryRequest)
router.patch('/update-request-status/:id', updateEntryRequest)


module.exports = router
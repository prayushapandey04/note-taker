// Modular Router import

const router = require('express').Router();

const routerNotes = require('./routeNotes');

router.use('/notes', routerNotes);

module.exports = router;
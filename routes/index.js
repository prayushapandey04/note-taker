// Modular Router import

const router = require('express').Router();

const routerNotes = require('./routeNotes');

router.use('/routeNotes', routerNotes);

module.exports = router;
import express from 'express';
const router = express.Router();

/* GET item list. */
router.get('/', (req, res) => {

  res.render('list');
});

export default router;

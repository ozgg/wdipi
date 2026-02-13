import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {

  res.render('index', { title: 'Where Did I Put It?' });
});

export default router;

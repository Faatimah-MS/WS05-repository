const path = require('path');
const express = require('express');

const router = express.Router();

function sendPage(req, res, fileName) {
  res.sendFile(path.join(req.app.locals.publicDir, fileName));
}

router.get('/', (req, res) => {
  // TODO (student): Serve public/index.html.
  sendPage(req, res,'index.html')

  // return res.status(501).send('TODO: implement GET /');
});

router.get('/about', (req, res) => {
  // TODO (student): Serve public/about.html.
  sendPage(req, res,'about.html')

 // return res.status(501).send('TODO: implement GET /about');
});

router.get('/contact', (req, res) => {
  // TODO (student): Serve public/contact.html.
  sendPage(req, res,'contact.html')

  // return res.status(501).send('TODO: implement GET /contact');
});

router.get('/blog', (req, res) => {
  // TODO (student): Keep this route working after moving page routes into this router.
  sendPage(req, res,'blog.html')
  // return res.status(501).send('TODO: implement GET /blog');
});

module.exports = router;
const router = require('express').Router();
let Author = require('../models/author.model');

router.route('/').get((req, res) => {
  Author.find()
    .then(authors => res.json(authors))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const authorname = req.body.authorname;

  const newAuthor = new Author({authorname});

  newAuthor.save()
    .then(() => res.json('Author added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
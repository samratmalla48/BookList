const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
  Category.find()
    .then(categorys => res.json(categorys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const categoryname = req.body.categoryname;

  const newCategory = new Category({categoryname});

  newCategory.save()
    .then(() => res.json('Category added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
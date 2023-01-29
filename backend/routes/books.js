const router = require('express').Router();
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });

const { v4 : uuidv4 } = require('uuid');
const path = require("path");
let Book = require('../models/book.model');


router.route('/').get((req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

var upload = multer({ storage: storage });
router.route('/add').post(upload.single("image"), (req, res) => {
  console.log(req.file);
  const authorname = req.body.authorname;
  const categoryname = req.body.categoryname;
  const description = req.body.description;
  const bookname = req.body.bookname;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const image = req.file.filename;
  // const image = 123;

  console.log(upload)


  console.log(req.body,req.file, 37)
  const newBook = new Book({
    authorname,
    categoryname,
    description,
    duration,
    bookname,
    date,
    image,
  });
 

  newBook.save()
  .then(() => res.json('Book added!'))
  .catch(err => res.status(400).json('Error: ' + err));

});


router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      book.authorname = req.body.authorname;
      book.categoryname = req.body.categoryname;
      book.bookname= req.body.bookname;
      book.description = req.body.description;
      book.duration = Number(req.body.duration);
      book.date = Date.parse(req.body.date);

      book.save()
        .then(() => res.json('Book updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
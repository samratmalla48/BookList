const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/author');
const categorysRouter = require('./routes/category');

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/categorys', categorysRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

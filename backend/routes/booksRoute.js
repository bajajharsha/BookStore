import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// POST request
// Route to Save a new Book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({ message: 'Send all the required fields' });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// GET request
// Route to get all book
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}).lean();
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
// Route to get a book from db by an id 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// PUT
// Route to Update a book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: 'Send all the required fields' });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book updated successfull y' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// DELETE
// Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted successfull y' });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }

})

export default router;

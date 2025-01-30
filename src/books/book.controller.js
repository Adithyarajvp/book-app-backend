const Book = require('./book.model');

const postABook = async (req,res) => {
    try{
        const newBook = await Book({...req.body});
        await newBook.save();   
        res.status(200).send({message: "Book posted successfully", book: newBook});
    }catch(err){
        console.error("Eroor Creating Book", err);
        res.status(500).send({message: "Failed to post book"});
    }
    
}

//get all books

const getAllBooks = async (req,res) => {
    try{
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send(books);
    }catch(err){
        console.error("Eroor Fetching Books", err);
        res.status(500).send({message: "Failed fetch books"});
    }
}

const getSingleBook = async (req, res) =>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).send({message: "Book Not Found!"});
        }
        res.status(200).send(book);
    }catch(err){
        console.error("Error Fetching Book", err);
        res.status(500).send({message: "Failed fetch book"});
    }
}

const updateBook = async (req,res) => {
    try{
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body, {new: true});
        if(!updatedBook){
            res.status(404).send({message: "Book Not Found!"});
        }
        res.status(200).send({
            message: "Book Updated Successfully",
            book: updatedBook,
        });
    }catch(error){
        console.error("Eroor updating a Book", err);
        res.status(500).send({message: "Failed to update a book"});
    }
}

const deleteBook = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message: "Book Not Found!"});
        }
        res.status(200).send({
            message: "Book Deleted Successfully",
            book: deletedBook,
        });
    }catch(err){
        console.error("Eroor deleting  Book", err);
        res.status(500).send({message: "Failed to delete a book"});
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
}
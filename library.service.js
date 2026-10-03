const {Book} = require('../models/Book');

async function LibraryService()
{
    try
    {
        const TestBook = new Book({
            bookID: 'B001',
            title: 'ABC',
            author: 'XYZ',
            category: 'Fiction',
            price: 120,
            availableCopies: -1
        });
        await TestBook.validate();
    }
    catch(err)
    {
        if(!err.errors?.availableCopies) throw err;
        console.log("Expected Error Available Copies set to value out of range: ", err.errors.availableCopies.message); 
    }
    const Books =[
        {bookID:'B01',title:'MongoDB Basics',author:'A. Shah',category:'Technology',price:450,availableCopies:3},
        {bookID:'B02',title:'Node.js Guide',author:'R. Mehta',category:'Technology',price:650,availableCopies:0},
        {bookID:'B03',title:'The River',author:'N. Patel',category:'Fiction',price:300,availableCopies:4,isActive:false},
        {bookID:'B04',title:'Web Development',author:'K. Rao',category:'Technology',price:550,availableCopies:2},
        {bookID:'B05',title:'Short Stories ',author:'M. Desai ',category:'Fiction',price:250,availableCopies:5},
    ];
    const InsertBooks = await Book.insertMany(Books);
    console.log("The Books Inserted are: ", InsertBooks);

    const allBooks = await Book.find();
    console.log("All Books in DB are: ",allBooks);

    const TechBooks= await Book.find({category:'Technology'}).sort({price:1});
    console.log("All Technology books sorted in increasing order of price: ",TechBooks);

    const issueBooks = await Book.find({$and:[{isActive:true},{availableCopies:{$gt:0}}]});
    console.log("All Books Available to Issue are: ",issueBooks);

    const updateprice = await Book.findOneAndUpdate({ bookID:'B03' },{$set:{price:350}},{returnDocument:'after',runValidators:true});
    console.log("Book B03 Price Updated, ",updateprice);

    const issuecopy = await Book.findOneAndUpdate({
        bookID:'B01'},{$inc:{availableCopies:-1}});
    console.log("Book B01 Issued. Updated Result: ",await Book.findOne({bookID:'B01'}));

    const DeleteBook = await Book.deleteOne({bookID:'B02'});
    console.log("Book B02 deleted: ",DeleteBook);

    const DoesB02Exist= await Book.exists({bookID:'B02'});
    console.log("Does Book B02 Exists? : ", Boolean(DoesB02Exist));
}
module.exports = {LibraryService};
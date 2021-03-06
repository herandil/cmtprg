var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    var bookController = require("../controller/bookController")(Book);
    var bookDetailController = require("../controller/bookDetailController")(Book);

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get)
        .options(function (req, res) {
            var option = {};
            option.Get = "Get all the books";
            option.Post = "Make a new book";
            res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'content-type, accept');
            res.header('Content-Type', 'application/json');
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            res.header('Allow-header','application/json');
            res.header('Allow','POST, GET, OPTIONS');
            res.json(option);
        });

    bookRouter.use('/:bookId', function (req,res,next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if(book) {
                console.log("Book found");
                req.book = book;
                next();
            }else{
                res.status(404).send("No book found!");
            }
        })
    });

    bookRouter.route('/:bookId')
        .get(bookDetailController.get)
        .put(bookDetailController.put)
        .patch(bookDetailController.patch)
        .delete(bookDetailController.remove)
        .options(bookDetailController.options);

    return bookRouter;

};

module.exports = routes;

// Access-Control-Allow-Origin → *
// Connection →
// Connection
// Options that are desired for the connection
// keep-alive
// Date → Fri, 13 Jan 2017 12:13:45 GMT
// ETag → W/"7-k/B7cg6/fRJGUSVpdhpYBA"
// X-Powered-By → Express
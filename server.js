//1st Step
//npm install express
const express = require('express'); //here we create a server with express.js

const bodyParser = require('body-parser')

//2nd Step
//------------------------------------------------------------------
//Here I Install Mongdb (npm install mongodb --save)
//Now After Installation we connect the mongodb through Mondo.Client method

//MONGOCLIENT
//Mongoclient is a cross-platform solution for connecting to and managing MongoDB databases:
const MongoClient = require('mongodb').MongoClient



//3RD STEP:
//------------------------------------------------------------------------
//So we Have to initializ or we have to start the express so for that we got All the functions and All the properties 

const app = express(); //This is how I initialize the express

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
console.log(express);

//console.log(app);

//Step 4:
//-----------------------------------------------------------------------------

//app.listen(3000, function() { //with the help of a listen method provided by Express 
//console.log('Connection Succesfull');
//})

var db;

//Here I  Connect our Database with the MongoClient with the help of Link that provide by the cluster 
//And by this DataBase I can Easily store the data into the cloud
MongoClient.connect('mongodb+srv://s1:1234@cluster0.ctp9rky.mongodb.net/test', (err, client) => {
    if (err)
        return console.log(err);
    //console.log(client);

    db = client.db('Books'); // Now here I go into the Book DataBase(Which I already created directly at the time of import the data of Book.Json ) in the client .

    app.listen(3000, () => {
        console.log('working')
    })
})

//GET method is simply fetching the data from the server
//So it contains the 2 Argument 1st one is the url or path '/' it's any thing after your domain name And the 2nd one
//is a callback function which tells the server what to do when the path is matched.
//-------------Its takes two Arguments-----------------------
//req object -> The data which have going from client to the server
//res object -> The data which send from server to client

//------------------------------------------Like if I want to send the file on express than simply I just use res.send-------
//app.get('/' , (req , res) =>{
//  res.send("hii");
//})
//-------------------------------------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {

    //Now here Collection/table  used to select the table that present into the database ot you can also create with the help of CreateCollection 
    //and find() is used for Show all Rows in a Collection./table in the form of Array
    db.collection('Book_Store').find().toArray((err, result) => { // So Here the find method return a Mongo object to results and
        // the  ToArray Method  convert the given collection into a normal array
        if (err)
            return console.log(err);
        res.render('index.ejs', { Book_Store: result }) //Finally, we have to render this index.ejs file when handling the GET request.
            // Here, we’re setting the results (an array)
    })

    //------------WHY I CREATE/NEED for  EJS FILE-----------------------
    //Basically we can.t generate/add the dynamic content on the HTML file so we use the template engines to help us out
    //Some popular template engine include Jade , Embedded JavaScript and Nunjucks

    //So here we will use Embedded JavaScript i.e (EJS)
    //So install it  by this(npm install ejs --save)
})

// STEP 5:
//-----------------------------------------------------------------------------------------

//In Post method I simply post the choice i.e the data which was selected by the customer(category) and it will post to the server by the name choice;
app.post('/path', (req, res) => {
    db.collection('Book_Store').updateMany({}, { $set: { "Choice": req.body.bk1 } }, (err, result) => { //Here the database is updated on the bases of catergory selection by the  customer
        if (err)
            return console.log(err)
                //console.log('saved to database')
        res.redirect('/') //Here I will redirect the path and come back to my home path the is '/'
            //console.log(req.body)
    })
})

app.post('/issue', (req, res) => {
    db.collection('Book_Store').updateOne({ Code: req.body.Code }, { $set: { "Student-ID": req.body.libid, "status": req.body.status } }, (err, result) => {
        if (err)
            return console.log(err);
        console.log('My second data work');
        console.log(req.body);
        res.redirect('/')
    })
})

app.get('/path', (req, res) => {
    db.collection('Book_Strore').find().toArray((err, result) => { // So Here the find method return a Mongo object to results and
        // the  ToArray Method  convert the given collection into a normal array
        if (err)
            return console.log(err);
        res.render('index.ejs', { Book_Store: result })
    })
})
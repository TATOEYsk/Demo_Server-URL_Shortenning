// Require
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// Init
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

// Database Key
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
.then( () => console.log("MongoDB Connected."))
.catch( err => console.log(err));


// Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect',redirect);

app.get('/:hash', (req,res) =>{
    const id = req.params.hash;
    console.log(id);
    URL.findOne({_id:id}, (err,doc) =>{
        if(doc){
            console.log(doc.url);
            res.redirect('http://'+doc.url);
        }else{
            res.redirect('/');
        }
    })
})
  
// Path
app.get('/', (req, res) =>{
    res.send('Hello SK');
});



// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT,() =>{
    console.log(`Server in runing on port http://localhost:${PORT}`);
});
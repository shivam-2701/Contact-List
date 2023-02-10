const express = require('express');
const port = 8080;
const path = require('path');
const app = express();

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    Contact.find({}, (err, contactList) => {
        if (err) {
            console.log('Error Fetching', err);
            return res.redirect('/error');
        }
        return res.render('home', {
            title: 'Home',
            contact_list: contactList
        });
    });
})
app.get('/practice', (req, res) => {
    res.render('practice', {
        title: 'Practice',
    });
});

app.post('/create-contact', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err, newContact) => {
        if (err) {
            console.log('Error creating contact!')
            return;
        }
        // console.log('******',newContact);
        return res.redirect('back');
    });
});


function deleteContact(contactItem) {
    let index = -1;

    index = contactList.findIndex((item) => item.phone === contactItem.phone);

    if (index != -1)
        contactList.splice(index, 1);
}

app.get('/delete-contact', (req, res) => {

    let id = req.query.id;


    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("Unable to delete contact",err);
            return;
        }
        console.log("Contact delete success");
        return res.redirect('/');
    })


});



app.listen(port, function (error) {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Server is running on : http://localhost:8080");
});
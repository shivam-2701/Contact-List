const express = require('express');
const port = 8080;
const path = require('path');
const app = express();

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const bodyParser = require('body-parser');
var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "12131321321"
    }
]
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    return res.render('home', {
        title: 'Home',
        contact_list: contactList
    });
})
app.get('/practice', (req, res) => {
    res.render('practice', {
        title: 'Practice',
    });
});
app.post('/create-contact', (req, res) => {
    contactList.push(req.body);
    res.redirect('/');
});


function deleteContact(contactItem) {
    let index = -1;

    index =contactList.findIndex((item)=>item.phone === contactItem.phone);

    if (index != -1)
        contactList.splice(index, 1);
}

app.get('/delete-contact', (req, res) => {

    let item = {
        name: req.query.name,
        phone: req.query.phone
    };

    deleteContact(item);

    return res.redirect('back');

});



app.listen(port, function (error) {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Server is running on : http://localhost:8080");
});
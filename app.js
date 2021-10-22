const express = require('express');
const bodyParser = require('body-parser');
const day = require('./date');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

let item = ''
const items = [];
const workItems = [];

app.get('/', (req, res) => {

    res.render('list', {ListTitle: day.day(), newListItem: items})

})

app.post('/', (req, res)=> {

    item = req.body.newItem ;

    if(req.body.list === 'Work')
    {
        workItems.push(item);
        res.redirect('/work')
    }

    else {
        if(item !== '')
        items.push(item);
        console.log(item);
        res.redirect('/')
    }
   
})

app.get('/work', (req, res)=> {
    res.render('list', {ListTitle: 'Work', newListItem: workItems})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
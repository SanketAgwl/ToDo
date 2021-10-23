const express = require('express');
const bodyParser = require('body-parser');
const day = require('./date');
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

let items = []
mongoose.connect("mongodb+srv://Sanket:nhp@cluster0.0pyou.mongodb.net/todolistDB");

const itemSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

const listSchema = mongoose.Schema({
    name: String , items: [itemSchema]
})

const List = mongoose.model('List', listSchema);


app.get('/', (req, res) => {

    Item.find((err, found)=> {
        if(err) console.error(err);
        else {

            if(found.length === 0) {
                Item.insertMany([{name: "Sample Task 1"}, {name: "Sample Task 2"}, {name: "Sample Task 3"}], (err)=> {
                    if(err) console.error(err);
                    else console.log("Successfully inserted initial items");
                });
                res.redirect("/");
            }
            else {
                res.render('list', {ListTitle: day.day(), newListItem: found})
            }
        };
    })

})

app.post('/', (req, res)=> {

    item = req.body.newItem ;

    // if(req.body.list === 'Work')
    // {
    //     workItems.push(item);
    //     res.redirect('/work')
    // }
        const listName = req.body.list;
        console.log(listName)

        List.findOne({name: listName}, (err, list)=>{
           if(list) 
            {
                list.items.push({name: item});
                list.save();
                res.redirect('/'+ listName);
            }
            else{
                Item.create({name: item}, (err)=>{
                    if(err) console.error(err);
                    else {
                        console.log(`Successfully inserted ${item}`)
                        res.redirect('/')
                }})
            }
        })


        // if(item !== '')
        // Item.create({name: item}, (err)=>{
        //     if(err) console.error(err);
        //     else {
        //         console.log(`Successfully inserted ${item}`)
        //         res.redirect('/')
        // }})


        // items.push(item);
        // console.log(item);
        // res.redirect('/')
})

app.get('/:urmom', (req, res)=> {

    List.findOne({name: req.params.urmom}, (err, list)=>{
        if(!list) {
            const newList = new List({
                name: req.params.urmom, items: []
            })        
        newList.save();
        res.render('list', {ListTitle: newList.name, newListItem: newList.items})
        res.redirect('/' + req.params.urmom)

        }
        else {
            console.log("Exists");
        res.redirect('/' + req.params.urmom)

    }

    })


})

app.get('/about', (req, res) => {
    res.render('about')
})

app.post('/delete', (req, res)=>{
    console.log(req.body.checkbox);
    Item.findByIdAndRemove(req.body.checkbox, (err)=> {
        if(err) console.error(err) 
        else console.log('Sucessfully deleted');
        res.redirect('/');
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
const express = require ('express');
const bodyParser = require('body-parser');
 const { LocalStorage } = require('node-localstorage');
const  users  = require('./users');
 const mongoose = require('mongoose');
const { default: axios } = require('axios');

mongoose.connect('mongodb+srv://superuser:superuser@crud.a1359sv.mongodb.net/students');


const app  = express();
const localstorage = new LocalStorage('/save');

let data = [];
let count = 0;

app.use(express.json())
app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>
{
    res.render('pages/index');
});

app.post('/save', async (req,res)=>
{
  //  console.log(req.body);
//  HandleStorage(req.body);
 let usr =  new users(
    {
        name: req.body.name,
        email: req.body.email
    }
 );

 let data = await usr.save();
 console.log(data);
    res.render('pages/index');
});

app.get('/add',(req,res)=>
{
    res.render('pages/add');
});

app.get('/data', async (req,res)=>
{
    data = [];

    data = await users.find();
    res.send(data);
   
});

app.get('/edit',(req,res)=>
{
    res.render('pages/edit')
});

app.get('/finduser/:_id',async(req,res)=>
{
    let data = await users.findById(req.params._id);
    console.log(data);

    res.send(data);
});

app.put('/edit/:_id', async (req,res)=>
{
    //console.log(req.params.id);
    console.log(req.parms);

   let data = await users.updateOne(
        req.params,
        {
            $set:req.body
        }
    )

        console.log(data);
    res.send('updated');
});

app.delete('/delselected/:_id', async (req,res)=>
{
    console.log( "_id: " +req.params._id);
    let selected = await users.deleteOne({_id:req.params._id});
    console.log (selected);
    res.send('deleted Selected');
});

app.delete('/deleteall',(req,res)=>
{
    if (localstorage.getItem('data')!==null)
    {
        localstorage.removeItem('data');
    }
    res.send('done');
});

app.listen(5700,()=>
{
    console.log("Server Is Up And Running On 5700 Port");
});

// function HandleStorage(d)
// {
//     data = [];
//     count = 0;
    
//     if (localstorage.getItem('data')!==null)
//     {
//         //means data exist
//         data = JSON.parse(localstorage.getItem('data'));
//        // console.log("Data Found");

//         if (data.length <=0)
//         {
//             count = 0;
//         }else
//         {
//             count = data.length-1;
//             count++;
//         }
//     }else
//     {
//         count = 0;
//     }
    
//     console.log('count is '+count);
//     data[count] = d;
//     localstorage.setItem('data',JSON.stringify(data));
//     //console.log(data);
// }
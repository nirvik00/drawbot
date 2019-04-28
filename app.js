const express=require('express');
const exhbs=require('express-handlebars');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const fs=require('fs');
const app=express();

process.env.PWD = process.cwd()
app.use('/public',express.static(process.env.PWD+'/public'));

// this is important : templating engine : 1. main 2. partial 3. Static File outside in views
//handlebars
app.engine('handlebars', exhbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//method override
app.use(methodOverride('_method'));

app.get('/', (req, res)=>{
    //fs.writeFileSync(__dirname+'/public/files/hello.txt', "hello world!");
    res.render('nsMain');
});


const port=process.env.PORT || 5500;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
});
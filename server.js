var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool; 

var app = express();
app.use(morgan('combined'));

var config = {
    user:'vipulbjj',
    database:'vipulbjj',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-vipulbjj-32429'
}

var articles = {
    'article-one':{
            title:'Article One',
            heading:'Article One',
            date:'12 Aug 2017',
            content:`
                <p>
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                    This is the content for my first article.This is the content for my first article.
                </p>`
        }
};

function createTemplate (data){
    var title=data.title;
    var heading = data.heading;
    var content = data.content;
    var date = data.date;
    var htmltemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, intial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container" >
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading} 
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
            
        </body>
    </html>
    `;
    return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config); 
app.get('/test-db', function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.status(200).send(JSON.stringify(result.rows));
        }
    })
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    console.log(articleName);
    res.send(createTemplate(articles[articleName]));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

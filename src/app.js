const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData= require('../utils/weatherData')

const port = process.env.port || 3000;

const publicStaticDirPath = path.join(__dirname,'../public');

const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath); 
app.use(express.static(publicStaticDirPath));


app.get('/',(req,res)=>{
   res.render('index',{
      title: 'weather app'

   });
})


app.get('/weather',(req,res)=>{
   const address = req.query.address;
   if(!address){
      return res.send({
         error: "you must address in search text box"
      })
   }

   weatherData(address,(error,{temprature,description,cityName}={})=>{
     if (error){
      return res.send({
         error
      })
     }
     console.log(temprature,description,cityName);
     res.send({
      temprature,
      description,
      cityName
     })
   })
});

app.get('*',(req,res)=>{
  res.render('404',{
   title:"page not found"
  })
})

 app.listen(port,()=>{
    console.log('server is running smoothly on port',port);
 })
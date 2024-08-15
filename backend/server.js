const  express =  require('express')  ;  
const dotenv  = require('dotenv')  ; 

// load  environment variables 
dotenv.config()  ; 

// // initialize the  exress app 
const app   =  express() ;   
 

// middleware  to  parse json req 
app.use(express.json())   ; 

// Simple logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});



// define   a  simple route  for  testing  
app.get('/'  , (req , res)  => {
    res.send('app  is running ')  ; 

});  


const  PORT = process.env.PORT  || 5000  ; 

app.listen(PORT , () => {
    console.log(`server  is running on port ${PORT}`)  ;
})

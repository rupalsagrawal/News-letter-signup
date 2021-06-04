         //jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res)

{
  res.sendFile(__dirname+'/signup.html');
});
//api-key:680e125dd786004c22ea59e7715d19cd-us7;
//list id:bcd309c5c8
app.post('/',function(req,res)
{
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  //console.log(req.body);
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }

      }
    ]
  };
  var jsondata=JSON.stringify(data);
  url="https://us7.api.mailchimp.com/3.0/lists/bcd309c5c8";
  const options={
    method:'POST',
    auth:'rupal:680e125dd786004c22ea59e7715d19cd-us7',
  }
  const request=https.request(url,options,function(response)
{   if(response.statusCode==200)
    {
      res.sendFile(__dirname+'/success.html');

    }
    else
    res.sendFile(__dirname+'/failure.html');
   response.on("data",function(data){
     console.log(JSON.parse(data));
   })
});
request.write(jsondata);
request.end();


});
app.listen(3000,function(){
  console.log("Server is up and ready");
})

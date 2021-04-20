const express=require("express");
const app=express();
const mysql=require('mysql');
var body=require('body-parser');
const { json } = require("body-parser");
app.use(body.json());
app.use(body({extended:true}))

var alert=require('alert')
const crypto = require('crypto');
const { log } = require("console");
/* const algorithm = 'aes-256-cbc'; */
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }

   function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }

app.get("/",(req,res)=>{
    res.sendFile("D:\\node\\Node Mysql Html\\index.html");
});
app.post('/',(req,res)=>{
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var qualification = req.body.qualification;
  var age= req.body.age;
  var phone = req.body.phone;
  var purpose = req.body.purpose;
  var business = req.body.business;
 //  console.log(p,q)
   
   var hw = encrypt(password)
  console.log("ko",hw)
   console.log("KING",decrypt(hw))
 const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users'
})
db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("mysql connected..")
    }
 
    var selectuser=`select username from user`;
    db.query(selectuser,(err,res)=>{
     if (err) throw err;
       console.log(err)
    /*  for (let index = 0; index < res.length; index++) {
         var element = res[index];
         ele1.push(element['username'])
        
     } */
    var insert=`insert into user (username,email,password,encrypteddata,qualification,age,phone,purpose,business) values 
    ("${username}","${email}","${hw.iv}","${hw.encryptedData}","${qualification}","${age}","${phone}","${purpose}","${business}") `;
                     
        db.query(insert,(err,result)=>{
                
        if  (err)  {
                           //console.log("Duplicte not allowed")
          alert("Username already taken !! Try another username ") 
           } else{
                     //  console.log(result.affectedRows)
          alert("Successfully Signed ") 
          }
                    
        })
    })
})
// res.sendFile("D:\\node\\Node Mysql Html\\index.html");
    });
app.post('/second.html',(req,res)=>{
    console.log("second");
   var loginuser = req.body.usernamee;
    var loginpassword = req.body.passwordd;
 
  const db=mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'users'
  }) 
     var select=`select password,encrypteddata from user where username="${loginuser}"`;
    db.query(select,(err,result)=>{
       if (err) throw err;
       console.log("select",select,result); 
       console.log(loginpassword);
       console.log(typeof(loginpassword));
       console.log(loginuser);
       var iv=result[0]['password']; 
    
       var encryptedData=result[0]['encrypteddata']; 
       var paen={iv,encryptedData};
       console.log(paen); 

      var dec=decrypt(paen);
      console.log(dec)
      //  console.log(typeof(dec))
    
          if(dec==loginpassword){
            console.log("hi welcome")
            res.sendFile("D:\\node\\Node Mysql Html\\three.html");
            alert('!!!!  WELCOME BACK  !!!!')
        }else{
            res.sendFile("D:\\node\\Node Mysql Html\\index.html");
            console.log("password wrong")
            alert('PassWord Wrong')
   
        }    
        }) 
   
}); 
app.listen(5000,()=>{
    console.log("server strart")
})
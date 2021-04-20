const express = require("express");
const bodyParser = require("body-parser");
var mysql=require("mysql")
const app = express();
var cros=require("cors")
app.use(cros())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
    
})
app.listen(3300)


app.post('/',(req,res)=>{
    var data=req.body;
    var eventname=data.eventname;
    var eventstartdate=data.eventstartdate;
    var eventenddate=data.eventenddate;
    var eventstarttime=data.eventstarttime;
    var eventendtime=data.eventendtime;
    var eventdescriptions=data.eventdescriptions;

    var create="create table if not exists events(id int AUTO_INCREMENT,eventname varchar(100),event_startdate DATE ,event_enddate DATE,event_starttime varchar(100),event_endtime varchar(100),event_description varchar(100),key(id))"
    con.query(create,(err,result)=>{
        if (err) throw err;
        console.log("table create")
    })
    
    var insert="insert into events (eventname,event_startdate,event_enddate,event_starttime,event_endtime,event_description) values('"+eventname+"','"+eventstartdate+"','"+eventenddate+"','"+eventstarttime+"','"+eventendtime+"','"+eventdescriptions+"')"
    con.query(insert,(err,result)=>{
        if (err) throw err;

        console.log("inserted")
        console.log(result)
        res.send(result)
    })


})

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
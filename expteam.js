let express = require('express')
let http=require('http');
let os = require('os');
let fs = require('fs');
let readline=require('readline');
let path=require('path');
let shuffle = require('shuffle-array');
let bodyparser=require('body-parser');
let app = express();
app.use(bodyparser());
app.use(function (req, res,next) {
    var userlog= fs.createWriteStream("userlog.txt", { 'flags': 'a' });
    userlog.write("\r\nThis App was used at " + new Date() + "\r\n");
    userlog.end();
    next();
});
app.get('/',function(req,res)
{
    res.sendFile('form.html',{root: './'});
});
app.post('/',function(req,res)
{
    //console.log(req.body);
    var fp=req.body.path;
    var size=req.body.teamsize;
fs.readFile(fp, function (err, data) {
 if(err)
 {
console.log("Error");
}
else if(!data)
        {
        console.log("No data");
        }
else
{
var jar = JSON.parse(data);
var asl = Object.keys(jar).length;
if(size > asl)
{
console.log("Size cannot be bigger than team members");
 res.send("Size cannot be bigger than team members");
 res.end();    
}
else if(size==0)
{
    console.log("Size cannot be zero");
    res.send("Size cannot be zero");
    res.end();
}
else
{
var n = Math.ceil(asl /size);     
var a=0;
var i = Object.keys(jar).length;
var q = Object.keys(jar).length;
var n=size;
let stream = fs.createWriteStream('D:/berkteams.txt');
var arr=[];
var t=1;
    for(w=0;w<q;w++)
    {
    arr.push(t);
    t++;
    }
shuffle(arr);
var rem=i%n;
 var qo=Math.floor(i/n);
 var b=0;
     for(var k=1;k<=qo;k++)
     {
         console.log("=======================");
         stream.write("========================="+os.EOL);
         stream.write("\nTeam"+k+os.EOL);
         console.log("\nTeam"+k);
         b=b+Math.floor(size);
         for(var s=a;s<i;s++)
         {
            if(s==b)
             {
                 a=b;
                 break;
             }
             var u=arr[s];
             console.log("--------------------------");
             stream.write("-----------------------------"+os.EOL);
            console.log("Name:"+jar["aspirant"+u]["name"]);
        console.log("Branch:"+jar["aspirant"+u]["branch"]);
        console.log("Favourite Language:"+jar["aspirant"+u]["favlang"]);
        stream.write("Name:"+jar["aspirant"+u]["name"]+os.EOL);
        stream.write("\nBranch:"+jar["aspirant"+u]["branch"]+os.EOL);
        stream.write("\nFavourite Language:"+jar["aspirant"+u]["favlang"]+os.EOL);
            }
         }
         for(var p=b;p<i;p++)
         {
            var t=arr[p];
             console.log("-------------------");
             stream.write("-------------------------------"+os.EOL);
             console.log("\nRemaining people");
             stream.write("Remaining people"+os.EOL);
             console.log("Name:"+jar["aspirant"+t]["name"]);
             console.log("Branch:"+jar["aspirant"+t]["branch"]);
             console.log("Favourite Language:"+jar["aspirant"+t]["favlang"]);
             stream.write("Name:"+jar["aspirant"+t]["name"]+os.EOL);
             stream.write("\nBranch:"+jar["aspirant"+t]["branch"]+os.EOL);
             stream.write("\nFavourite Language:"+jar["aspirant"+t]["favlang"]+os.EOL);        
         }
        }
    }
    let sendFile = fs.createReadStream('D:/berkteams.txt');
    sendFile.pipe(res);     
    });
});
app.listen(3000,(err)=>{
            console.log("listening to port 3000");
    });

const express = require('express');
const fs = require("fs")
var cors = require('cors');
const path = require("path");

var name='sample'
var pathname='./music/sample.mp3'


const app =express();
const NodeID3 = require('node-id3')
app.use(cors({origin: '*'}));
app.listen(4000,()=>{console.log("running on port 4000");})
const image={
    mime: "image/png",
  type: {
    id: 1
  }, // See https://en.wikipedia.org/wiki/ID3#ID3v2_embedded_image_extension
  description: "image description",
  imageBuffer: fs.readFileSync(`./music/${name}.jpg`)
}


app.get('/audio',(req,res)=>{
    try{
    fs.readdir(path.join(process.cwd(), "music"),async (err, files) => {

        //console.log(err, files)
        
        let max = files.length - 1;
        let min = 0;
    
        let index = Math.round(Math.random() * (max - min) + min);
        let file = files[index];
        const lastIndex = file.toString().lastIndexOf('.')
        name=await file.toString().slice(0,lastIndex);
        pathname
        console.log("Random file is", name);
        const tags = NodeID3.read(`./music/${name}.mp3`)
        const imageBuffer = fs.readFileSync(`./music/${name}.jpg`)
        fs.readFile(`./music/${name}.mp3`, function(err, result) {
       
            const body={
                tags:tags,
                audio:result.toString('base64'),
                image:imageBuffer.toString('base64')
            }
            
            res.status(200).json(body)
          });
    });
}catch(err){console.log(err);}
     
})


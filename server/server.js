const express = require('express');
const fs = require("fs")
var cors = require('cors');



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
  imageBuffer: fs.readFileSync('cover.jpg')
}
const tags = NodeID3.read('./sample.mp3');
tags.image=image;
NodeID3.write(tags,'./sample.mp3');
app.get('/audio',(req,res)=>{
    const range = req.headers.range;
    const path = './sample.mp3'
    const size = fs.statSync(path).size;

    const chunkSize  = 1 + 1e+6 //1MB
    const start  = Number(range.replace(/\D/g,''));
    const end = Math.min(start + chunkSize,size-1);

    const contentLength = end-start+1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "audio/mpeg"
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(path, { start, end })
    stream.pipe(res);
})
app.get('/image',(req,res)=>{
    try{
    const tags = NodeID3.read('./sample.mp3')
NodeID3.read('./sample.mp3', function(err, tags) {
    res.status(200).json(tags.image.imageBuffer.toString('base64'));
})
    }catch(err){console.log(err);}
})

app.get('/metadata',(req,res)=>{
    try{
    const tags = NodeID3.read('./sample.mp3')
NodeID3.read('./sample.mp3', function(err, tags) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.status(200).json(tags)
})
    }catch(err){console.log(err);}
})
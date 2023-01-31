const express = require('express');
const fs = require("fs")
const app =express();
app.listen(4000,()=>{console.log("running on port 4000");})

app.get('/audio',(req,res)=>{
    const range = req.headers.range;
    const path = './katz.mp3'
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
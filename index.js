import express from "express"
const app = express()
app.get('/list/pornster/:num?', (req, res) => {
    res.send('ok ' + req.params.num)
})
app.listen(8080, () => {
    console.log("ok");
})


// import {} from Cheerio

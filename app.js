import express from "express";
import cors from "cors"
import { channel, search, TopList, trending, video } from "./contoroller.js"
const app = express()
app.use(cors())
app.get('/top/list/pornstars/:nam?', (req, res) => {
    TopList(req.params.nam).then((r) => {
        res.json(
            r
        )
    })
})
app.get('/channel/:name', (req, res) => {
    channel("https://xhamster3.com/pornstars/" + req.params.name).then((r) => {
        res.json(r)
    })
})
app.get('/video', (req, res) => {
    video(req.query.url).then((r) => {
        res.json(r)
    })
})
app.get('/serch/:name', (req, res) => {
    search(req.params.name).then((r) => {
        res.json(r)
    })
})
app.get('/', (_, res) => {
    trending().then((r) => {
        res.json(r)
    })
})
app.listen(process.env.PORT, () => {
    console.log('ok');
})

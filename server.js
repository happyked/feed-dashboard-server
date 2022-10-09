import cors from "cors"
import express from "express"
import fetch from "node-fetch"

import rss from "rss-to-json"

const app = express()
app.use(cors())

console.log("test")

let feeds = [
    {
        name: "Sentinelone",
        url: "http://localhost:3000/sentinelone"
    }, {
        name: "Bleepingcomputer",
        url: "http://localhost:3000/bleepingcomputer"
    }, {
        name: "Microsoft",
        url: "http://localhost:3000/microsoft"
    }, {
        name: "Microsoft-Security",
        url: "http://localhost:3000/microsoft-security"
    }, {
        name: "TheHackersNews",
        url: "http://localhost:3000/TheHackersNews"
    }, {
        name: "Krebsonsecurity",
        url: "http://localhost:3000/krebsonsecurity"
    }
]


app.get("/allFeeds", async (req, res) => {
    try {
        res.json(feeds)
    } catch(err) {
        res.status(err.code).json(err)
    }
})

app.get("/sentinelone", async (req, res) => {
    try {
        const data = await rss.parse("https://www.sentinelone.com/feed/")
        res.json(convertFeed(data.items))
    } catch(err) {
        res.status(err.code).json(err)
    }
})

app.get("/bleepingcomputer", async (req, res) => {
    try {
        const data = await rss.parse("https://www.bleepingcomputer.com/feed/")
        res.json(convertFeed(data.items))
    } catch(err) {
        res.status(err.code).json(err)
    }
})

app.get("/microsoft", async (req, res) => {
    try {
        const data = await rss.parse("https://msrc-blog.microsoft.com/feed/")
        console.log(data)
        res.json(convertFeed(data.items))
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/krebsonsecurity", async (req, res) => {
    try {
        const data = await rss.parse("https://krebsonsecurity.com/feed/")
        console.log(data)
        res.json(convertFeed(data.items))
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/microsoft-security", async (req, res) => {
    try {
        const data = await rss.parse("https://www.microsoft.com/security/blog/feed/")
        console.log(data)
        res.json(convertFeed(data.items))
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.get("/TheHackersNews", async (req, res) => {
    try {
        const data = await rss.parse("http://feeds.feedburner.com/TheHackersNews?format=xml")
        console.log(data)
        res.json(convertFeed(data.items))
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

let convertFeed = (feeds) => {
    return feeds.map((feed) => {
        return {
            title: feed.title,
            url: feed.link,
            date: new Date(feed.published)
        }
    })
}


app.listen(3000, () => {
    console.log("App is running");
})

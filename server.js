const express = require('express')
const puppeteer = require('puppeteer')
const absolutify = require('absolutify')
const app = express()

app.get('/', async(req, res) => {
    const { url } = req.query;

    if(!url) {
        return res.send("No URL found")
    }

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://${url}`)
    
        let document = await page.evaluate(() => document.documentElement.outerHTML)
        console.log("url", url)
        document = absolutify(document, `/?url=${url.split('/')[0]}`)
    

        return res.send(document)
    }
    catch(err) {
        return res.send(err)
    }
    
})

app.listen(3001, () => {
    console.log("Server started on 3001")
})
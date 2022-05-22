const express = require('express')
const app = express()
const port = process.env.PORT || 1025;

const youtube = require('scrape-youtube');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const query = req.query.q

    try {
        if (req.query.q == undefined) {
            res.send('No query provided')
        } else {
            youtube.search(query).then((results) => {
                // Unless you specify a custom type you will only receive 'video' results
                res.send(results.videos);
            });
        }
    } catch {
        res.send('No query provided')
    }
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})
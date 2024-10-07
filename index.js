const express = require('express');
const { alldown } = require('nayan-media-downloader');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/download', async (req, res) => {
    const url = req.query.url;
    if (!url || !isValidUrl(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const data = await alldown(url);

        const {title, high, low} = data.data

        const result = {
            devname: "Sojib Xoudhury",
            devfb: "https://www.facebook.com/Sojib14X",
            title: title,
            hd: high,
            sd: low
        }
        res.json(result);
    } catch (error) {
        res.status(500).send('Error downloading media: ' + error.message);
    }
});

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
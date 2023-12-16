import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let app = express();

app.get('/', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/index.html'))
})
app.get('/css', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/styles.css'))
})
app.get('/js', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/main.js'))
})




app.listen(8000, () => {
    console.log('Server listening on port 8000');
})
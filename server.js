import express from "express";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

let app = express();
app.use(express.json());

let db = [];
let sortedDb = [];
let tasksServed = 0;

app.get('/', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/index.html'))
})
app.get('/css', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/styles.css'))
})
app.get('/js', (req, res) => {
    res.sendFile(join(dirname(fileURLToPath(import.meta.url)), '/public/main.js'))
})

app.post('/create-task', (req, res) => {
    if(db.length < 10) {
        db.push(req.body);
        tasksServed++;
        res.send(db);
    } else {
        res.send(null);
    }
})

app.delete('/delete-task/:index', (req, res) => {
    let index = req.params.index;
    sortedDb.splice(index, 1);
    res.send(sortedDb);
})

app.get('/sort-task', (req, res) => {
    res.send(shuffleSort());
})

app.listen(8000, () => {
    console.log('Server listening on port 8000');
})



function shuffleSort() {
    const uniqueSet = new Set()
    const max = db.length - 1;
    sortedDb.length = 0;

    while(uniqueSet.size < 3) {
      uniqueSet.add(Math.floor(Math.random() * max) + 1);
    }
    uniqueSet.forEach((newIndex) => { sortedDb.push(db[newIndex]); })
    return sortedDb;
}
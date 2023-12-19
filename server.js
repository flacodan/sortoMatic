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

app.delete('/delete-task/:name', (req, res) => {
    let name = req.params.name;
    for(let i = 0; i < db.length; i++) {
        if (db[i].task === name) {
            db.splice(i, 1);
        }
    }
    res.send(db);
})

app.delete('/delete-sortedTask/:index', (req, res) => {
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
    const max = db.length;
    sortedDb.length = 0;
    const numToSort = (max < 3) ? max : 3;

    while(uniqueSet.size < numToSort) {
      uniqueSet.add(Math.floor(Math.random() * max));
    }
    uniqueSet.forEach((newIndex) => { sortedDb.push(db[newIndex]); })
    return sortedDb;
}

// sortedDb lloks like: { task: 'jkfghjf' }, { task: 'kmfgjjh' }, { task: 'hsder' }
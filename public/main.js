const fullList = document.getElementById('full-list');
const taskInput = document.getElementById('add-task-field');
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const sortedList = document.getElementById('sorted-list');
const deleteButton = document.getElementById('delete-task-button');

addButton.addEventListener('click', (event) => {
    if (taskInput.value.length < 1) {
        alert("I see what you're doing - but we can't do the work for you. Do better.")
        return;
    }
    let maBod = { task: taskInput.value };
    axios.post('/create-task', maBod)
    .then((response) => { buildFullTaskList(response.data); })
    .catch((err) => { console.log(err); })
})

sortButton.addEventListener('click', (event) => {
    if (fullList.innerHTML) {
        axios.get('/sort-task')
        .then((response) => { buildSortedTaskList(response.data); })
        .catch((err) => { console.log(err); })
    }
})

// deleteForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     axios.delete('/delete-fighter/' + deleteInput.value)
//     .then((result) => {
//         fillFullTaskList(result.data);})
//     .catch((err) => {console.log(err);})
// })

// axios.get('/fighters')
// .then((result) => {
//     fillFullTaskList(result.data);
// })
// .catch((err) => {
//     console.log(err);
// })

function buildFullTaskList(fullTaskArray) {
    fullList.innerHTML='';

    for(let i=0; i < fullTaskArray.length; i++) {
        let thisItem = document.createElement('p');
        thisItem.innerHTML = fullTaskArray[i].task;
        fullList.appendChild(thisItem);
    }

}

function buildSortedTaskList(sortedTaskArray) {
    sortedList.innerHTML='';
    for(let i=0; i < sortedTaskArray.length; i++) {
        let thisItem = document.createElement('option');
        thisItem.innerHTML = sortedTaskArray[i].task;
        sortedList.appendChild(thisItem);
        //console.log(thisItem);
    }

}
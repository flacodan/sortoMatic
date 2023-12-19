const fullList = document.getElementById('full-list');
const taskInput = document.getElementById('add-task-field');
const addButton = document.getElementById('add-button');
const sortButton = document.getElementById('sort-button');
const sortedList = document.getElementById('sorted-list');
//const selectList = document
const deleteButton = document.getElementById('delete-task-button');

addButton.addEventListener('click', (event) => {
    if (taskInput.value.length < 1) {
        alert("I see what you're doing - but we can't do the work for you. Do better.")
        return;
    }
    let maBod = { task: taskInput.value };
    taskInput.value='';
    axios.post('/create-task', maBod)
    .then((response) => { 
        if (response.data) {buildFullTaskList(response.data);}
        else {alert("Your list is full and you cannot add more tasks. Learn to say 'no' or complete some tasks before adding more.");} 
    })
    .catch((err) => { console.log(err); })
})

sortButton.addEventListener('click', (event) => {
    if (fullList.innerHTML) {
        axios.get('/sort-task')
        .then((response) => { buildSortedTaskList(response.data); })
        .catch((err) => { console.log(err); });
    }
})

deleteButton.addEventListener('click', (event) => {
    if (sortedList.selectedIndex <=0) {
        alert("You need to select a task before we can clear it.")
        return;
    }

    let selectedIndex = sortedList.options[sortedList.selectedIndex].id;

    let name = sortedList.options[selectedIndex].text;
    if (selectedIndex) {
        axios.delete('/delete-sortedTask/' + selectedIndex)
        .then((response) => { buildSortedTaskList(response.data); })
        .catch((err) => { console.log(err); });

        axios.delete('/delete-task/' + name)
        .then((response) => { buildFullTaskList(response.data); })
        .catch((err) => { console.log(err); });
    }
})

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
        thisItem.id = i;
        sortedList.appendChild(thisItem);
    }

}
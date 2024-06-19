document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskItem = createTaskItem(taskText);
        document.getElementById('pending-list').appendChild(taskItem);
        taskInput.value = '';
    }
}

function createTaskItem(taskText) {
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    const completeButton = document.createElement('button');
    completeButton.classList.add('complete');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => completeTask(li));

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(li));

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));

    actionsDiv.appendChild(completeButton);
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);

    return li;
}

function completeTask(taskItem) {
    taskItem.querySelector('.complete').remove();
    document.getElementById('completed-list').appendChild(taskItem);
}

function editTask(taskItem) {
    const taskText = taskItem.querySelector('span').textContent;
    const newTaskText = prompt('Edit Task', taskText);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.querySelector('span').textContent = newTaskText.trim();
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
}

const taskData = getTasks();

const taskListElement = document.getElementById('task-list');
const newTaskInputElement = document.getElementById('new-task-input');

taskListElement.addEventListener('click', taskListener);
newTaskInputElement.addEventListener('change', newTaskListener);

function taskListener(event) {
    const target = event.target;
    const row = target.parentElement;
    const rowNo = Array.from(taskListElement.children).indexOf(row);
    if (target.classList.contains('task-check-off')) {
        const item = target.nextElementSibling.nextElementSibling;
        item.classList.add('task-completed');
        taskData[rowNo].completed = true;
    } else if (target.classList.contains('task-remove')) {
        row.remove();
        for (let i=rowNo; i < taskData.length - 1; i++) {
            taskData[i] = taskData[i + 1];
        }
        taskData.length--;
    }
}

function newTaskListener(event) {
   const target = event.target;
   const newRow = document.createElement('tr');
   newRow.innerHTML = `<td class="task-check-off">&check;</td>
        <td class="task-remove">&cross;</td>
        <td contenteditable="true">${target.value}</td>`;
   taskListElement.appendChild(newRow);
   taskData.push({text: target.value, completed: false});
   target.value = '';
}


function getTasks() {
    return []; // TODO: Retrieve tasks from local storage.
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then(res => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err))
    })
  }


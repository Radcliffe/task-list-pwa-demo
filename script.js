const taskListElement = document.getElementById('task-list');
const newTaskInputElement = document.getElementById('new-task-input');

taskListElement.addEventListener('click', taskListener);
newTaskInputElement.addEventListener('change', newTaskListener);

function taskListener(event) {
    const target = event.target;
    if (target.classList.contains('task-check-off')) {
        const item = target.nextElementSibling.nextElementSibling;
        item.classList.add('task-completed');
    } else if (target.classList.contains('task-remove')) {
        target.parentElement.remove();
    }
}

function newTaskListener(event) {
   const target = event.target;
   const newRow = document.createElement('tr');
   newRow.innerHTML = `<td class="task-check-off">&check;</td>
        <td class="task-remove">&cross;</td>
        <td contenteditable="true">${target.value}</td>`;
   taskListElement.appendChild(newRow);
   target.value = '';
}
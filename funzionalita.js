const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('lista');

document.addEventListener('DOMContentLoaded', loadTasks);

taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  createTaskElement(text, false);
  saveTasks();
  taskInput.value = '';
}

function createTaskElement(text, isCompleted) {
  const li = document.createElement('li');
  if (isCompleted) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.onclick = function() {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('todos');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => createTaskElement(task.text, task.completed));
  }
}
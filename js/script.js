class TaskManager {
    constructor() {
        this.tasks = this.loadTasks() || [];
        this.taskList = document.getElementById('taskList');
        this.taskInput = document.getElementById('taskInput');
        this.taskTime = document.getElementById('taskTime');
        this.addTaskBtn = document.getElementById('addTask');
        
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        this.renderTasks();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        const taskTime = this.taskTime.value;
        if (!taskText) return;

        const task = {
            id: Date.now(),
            text: taskText,
            time: taskTime,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        
        this.taskInput.value = '';
        this.taskTime.value = '';
    }

    toggleComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <div class="task-content">
                    <span>${task.text}</span>
                    ${task.time ? `<span class="task-time">${task.time}</span>` : ''}
                </div>
                <div class="task-actions">
                    <button onclick="taskManager.toggleComplete(${task.id})">
                        ${task.completed ? '取消完成' : '完成'}
                    </button>
                    <button onclick="taskManager.deleteTask(${task.id})">删除</button>
                </div>
            `;
            this.taskList.appendChild(li);
        });
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        return JSON.parse(localStorage.getItem('tasks'));
    }
}

// 初始化任务管理器
const taskManager = new TaskManager();

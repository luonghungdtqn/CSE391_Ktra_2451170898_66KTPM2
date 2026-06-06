document.addEventListener('DOMContentLoaded', () => {
    
    const taskListContainer = document.getElementById('taskListContainer');
    const taskInput = document.getElementById('taskInput');
    const prioritySelector = document.getElementById('prioritySelector');
    const confirmAddBtn = document.getElementById('confirmAddBtn');
    
    let tasks = [];

    let currentPriority = 'Low'; // Priority mặc định trong modal

    // Xử lý nút chọn priority trong modal
    prioritySelector.addEventListener('click', (e) => {
        const targetBtn = e.target;
        if (targetBtn.classList.contains('priority-select-btn')) {
            prioritySelector.querySelector('.active').classList.remove('active');
            targetBtn.classList.add('active');
            currentPriority = targetBtn.getAttribute('data-value');
        }
    });

    // Hàm render danh sách task
    function renderTasks() {
        taskListContainer.innerHTML = ''; // Xóa danh sách cũ trên màn hình

        // Nếu mảng trống, màn hình cũng sẽ không in ra thẻ task nào
        tasks.forEach(task => {
            const priorityClass = task.priority.toLowerCase();
            const card = document.createElement('div');
            card.className = 'card task-card mb-3';
            card.innerHTML = `
                <div class="card-body d-flex justify-content-between align-items-center p-4">
                    <div class="row w-75 align-items-center">
                        <div class="col-4">
                            <span class="task-label">Task</span>
                            <div class="task-title">${task.title}</div>
                        </div>
                        <div class="col-4">
                            <span class="task-label">Priority</span>
                            <div class="task-priority priority-${priorityClass}">${task.priority}</div>
                        </div>
                        <div class="col-4">
                            <span class="status-badge">${task.status}</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <div class="status-ring-container icon-status-${task.iconType}">
                            <div class="status-ring-base"></div>
                            <div class="status-ring-active"></div>
                        </div>
                        <i class="fa-regular fa-pen-to-square action-icon icon-edit edit-task-btn" data-task-id="${task.id}"></i>
                        <i class="fa-regular fa-trash-can action-icon icon-delete delete-task-btn" data-task-id="${task.id}"></i>
                    </div>
                </div>
            `;
            // Chèn task mới lên đầu danh sách
            taskListContainer.prepend(card);
        });
    }

    // Load danh sách ban đầu (Trống)
    renderTasks();

    // Xử lý nút Add Task
    confirmAddBtn.addEventListener('click', () => {
        const title = taskInput.value.trim();
        if (title) {
            const newTask = {
                id: Date.now(), // Dùng Date.now() để tạo ID ngẫu nhiên không trùng lặp cho task mới
                title: title,
                priority: currentPriority,
                status: 'To Do',
                iconType: 'gym' // Mặc định là gym ring cho task mới
            };
            
            // Thêm dữ liệu vào mảng
            tasks.push(newTask);
            
            // Render lại màn hình (lúc này sẽ hiện task vừa thêm)
            renderTasks();
            
            // Đóng modal
            const addTaskModal = document.getElementById('addTaskModal');
            const bootstrapModal = bootstrap.Modal.getInstance(addTaskModal);
            bootstrapModal.hide();
            
            // Reset form
            taskInput.value = '';
            prioritySelector.querySelector('.active').classList.remove('active');
            prioritySelector.querySelector('.btn-low').classList.add('active');
            currentPriority = 'Low';
        } else {
            alert('Vui lòng nhập tên công việc.');
        }
    });

    // Xử lý Xóa / Sửa (Event Delegation)
    taskListContainer.addEventListener('click', (e) => {
        // Nút Xóa
        if (e.target.classList.contains('delete-task-btn')) {
            const taskId = parseInt(e.target.getAttribute('data-task-id'));
            if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
                tasks = tasks.filter(task => task.id !== taskId);
                renderTasks();
            }
        }
        
        // Nút Sửa
        if (e.target.classList.contains('edit-task-btn')) {
            const taskId = parseInt(e.target.getAttribute('data-task-id'));
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                const newTitle = prompt('Đổi tên task mới cho "' + task.title + '":', task.title);
                if (newTitle && newTitle.trim()) {
                    task.title = newTitle.trim();
                    renderTasks();
                }
            }
        }
    });

});
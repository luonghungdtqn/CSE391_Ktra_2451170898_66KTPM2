document.addEventListener('DOMContentLoaded', () => {
    
    // Chức năng nút Add Task
    const addTaskBtn = document.querySelector('.btn-add-task');
    addTaskBtn.addEventListener('click', () => {
        alert('Chức năng thêm Task sẽ được mở tại đây!');
    });

    // Chức năng nút Xóa (Delete)
    const deleteButtons = document.querySelectorAll('.icon-delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Xác nhận trước khi xóa
            if(confirm('Bạn có chắc chắn muốn xóa task này không?')) {
                const card = this.closest('.task-card');
                // Thêm class tạo hiệu ứng mờ dần
                card.classList.add('fade-out');
                
                // Đợi hiệu ứng kết thúc rồi xóa element khỏi DOM
                setTimeout(() => {
                    card.remove();
                }, 300);
            }
        });
    });

});
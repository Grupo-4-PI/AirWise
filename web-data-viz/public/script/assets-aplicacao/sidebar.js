const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn && toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
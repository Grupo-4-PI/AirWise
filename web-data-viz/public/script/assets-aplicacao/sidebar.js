const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn && toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('collapsed')
});
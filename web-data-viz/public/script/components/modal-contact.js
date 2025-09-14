const toggleBtn = document.querySelector('.toggle-info');
const infoCard = document.querySelector('.info-card');

toggleBtn.addEventListener('click', () => {
    infoCard.classList.toggle('active');
    toggleBtn.textContent = infoCard.classList.contains('active')
        ? "Fechar informações"
        : "Mais informações";
});

function closeContactInfo() {
    document.getElementById('toggle-info').checked = false;
    toggleBtn.textContent = "Mais informações"
}

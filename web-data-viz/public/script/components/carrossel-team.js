document.addEventListener('DOMContentLoaded', () => {
    const stack = document.getElementById('stack');
    const cards = Array.from(stack.querySelectorAll('.card'));
    const prevBtn = document.querySelector('.setas-carrossel.esquerda');
    const nextBtn = document.querySelector('.setas-carrossel.direita');

    let ativo = 2; // índice inicial

    function render() {
        cards.forEach((card, i) => {
            card.classList.remove('card--active', 'card--left', 'card--right', 'card--hidden');
            const diff = i - ativo;
            if (diff === 0) card.classList.add('card--active');
            else if (diff === -1) card.classList.add('card--left');
            else if (diff === 1) card.classList.add('card--right');
            else card.classList.add('card--hidden');
        });
    }

    function mover(d) {
        ativo += d;
        if (ativo < 0) ativo = cards.length - 1;
        if (ativo > cards.length - 1) ativo = 0;
        render();
    }

    // Clique nos botões
    prevBtn?.addEventListener('click', (e) => { e.preventDefault(); mover(-1); resetAutoplay(); });
    nextBtn?.addEventListener('click', (e) => { e.preventDefault(); mover(1); resetAutoplay(); });

    // Teclado
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { mover(-1); resetAutoplay(); }
        if (e.key === 'ArrowRight') { mover(1); resetAutoplay(); }
    });

    render();

    // autoplay
    let autoplay = setInterval(() => mover(1), 6000);

    // Reseta o intervalo quando o usuário interage (opcional)
    function resetAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(() => mover(1), 6000);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o container dos cards
    const stack = document.getElementById('stack');

    // Converte NodeList de cards em array
    const cards = Array.from(stack.querySelectorAll('.card'));

    // Seleciona botões de navegação
    const prevBtn = document.querySelector('.setas-carrossel.esquerda');
    const nextBtn = document.querySelector('.setas-carrossel.direita');

    let ativo = 2; // índice inicial do card ativo

    // Função que atualiza a visualização dos cards
    function render() {
        cards.forEach((card, i) => {
            // Calcula a diferença com o card ativo
            card.classList.remove('card--active', 'card--left', 'card--right', 'card--hidden');
            const diff = i - ativo;

            // Card ativo
            if (diff === 0) card.classList.add('card--active');

            // Card à esquerda
            else if (diff === -1) card.classList.add('card--left');

            // Card à direita
            else if (diff === 1) card.classList.add('card--right');

            // Cards escondidos
            else card.classList.add('card--hidden');
        });
    }

    // Função que move o card ativo

    function mover(d) {

        // Altera o índice
        ativo += d;
        if (ativo < 0) ativo = cards.length - 1; // wrap-around início (quando chega ao último card, ele volta para o começo)
        if (ativo > cards.length - 1) ativo = 0; // wrap-around fim (quando está no 1 card, se clicar para a esquerda, ele volta para o começo)
        render();// Atualiza a visualização
    }

    // Clique nos botões
    prevBtn?.addEventListener('click', (e) => { e.preventDefault(); mover(-1); resetAutoplay(); }); // Quano o usuário clicar no botão de voltar, ele vai para o card anterior (-1)
    nextBtn?.addEventListener('click', (e) => { e.preventDefault(); mover(1); resetAutoplay(); }); // Reinicia o autoplay para que o tempo de troca de card volte a contar do 0

    // Teclado (keyboard- setas esquerda e direita no teclado)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { mover(-1); resetAutoplay(); }
        if (e.key === 'ArrowRight') { mover(1); resetAutoplay(); }
    });

    render(); // Garante que o card central certo carregue junto com a página

    // Autoplay (função de troca automática de card)
    let autoplay = setInterval(() => mover(1), 6000); // Troca a cada 6 segundos

    // Reseta o intervalo quando o usuário interage (opcional)
    function resetAutoplay() {
        clearInterval(autoplay);
        autoplay = setInterval(() => mover(1), 6000);
    }
});

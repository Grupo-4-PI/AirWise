// Dados do gráfico "Melhores Desempenhos"
const melhoresLabels = ["Cobrança", "Contrato / Oferta", "Privacidade"];
const melhoresData = {
    labels: melhoresLabels,
    datasets: [
        {
            label: 'Empresa',
            data: [4.27, 4.25, 4.25],
            backgroundColor: '#1f77b4'
        },
        {
            label: 'Mercado',
            data: [3.83, 3.81, 3.67],
            backgroundColor: '#ff7f0e'
        }
    ]
};

const melhoresConfig = {
    type: 'bar',
    data: melhoresData,
    options: {
        plugins: {
            title: {
                display: false,
            }
        },
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                min: 3.0,
                max: 5.0
            }
        }
    }
};

new Chart(
    document.getElementById('melhoresDesempenhos'),
    melhoresConfig
);

// Dados do gráfico "Piores Desempenhos"
const pioresLabels = ["Saúde e Segu.", "Entrega do Prod.", "Vício de Quali."];
const pioresData = {
    labels: pioresLabels,
    datasets: [
        {
            label: 'Empresa',
            data: [3.61, 3.55, 3.51],
            backgroundColor: '#1f77b4'
        },
        {
            label: 'Mercado',
            data: [3.43, 3.51, 3.44],
            backgroundColor: '#ff7f0e'
        }
    ]
};

const pioresConfig = {
    type: 'bar',
    data: pioresData,
    options: {
        plugins: {
            title: {
                display: false
            }
        },
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                min: 3.0,
                max: 5.0
            }
        }
    }
};

new Chart(
    document.getElementById('pioresDesempenhos'),
    pioresConfig
);

// Dados do gráfico "Melhores Desempenhos"
const melhoresLabels = ["Cobrança", "Contrato / Oferta", "Privacidade", "Atendimento SAC"];
const melhoresData = {
    labels: melhoresLabels,
    datasets: [
        {
            label: 'Empresa',
            data: [4.27, 4.25, 4.25, 4.13],
            backgroundColor: '#1f77b4'
        },
        {
            label: 'Mercado',
            data: [3.83, 3.81, 3.67, 3.77],
            backgroundColor: '#ae00d5ff '
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
const pioresLabels = ["Informação","Saúde e Segu.", "Entrega do Prod.", "Vício de Quali.",];
const pioresData = {
    labels: pioresLabels,
    datasets: [
        {
            label: 'Empresa',
            data: [4.07, 3.61, 3.55, 3.51],
            backgroundColor: '#1f77b4'
        },
        {
            label: 'Mercado',
            data: [3.72, 3.43, 3.51, 3.44],
            backgroundColor: '#ae00d5ff'
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

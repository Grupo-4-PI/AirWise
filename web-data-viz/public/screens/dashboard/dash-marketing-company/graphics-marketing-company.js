const map = L.map('map', {
    center: [-15.78, -47.93],
    zoom: 1,
    zoomControl: false,
    attributionControl: false
});


map.dragging.disable();
map.scrollWheelZoom.disable();
map.doubleClickZoom.disable();
map.touchZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();

// dados fictícios
const dados = {
    'AC': 0.20,
    'AL': -0.95,
    'AM': 0.32,
    'AP': -0.60,
    'BA': 0.87,
    'CE': -0.60,
    'DF': 0.14,
    'ES': 0.34,
    'GO': 0.17,
    'MA': -1.37,
    'MG': -0.09,
    'MS': 0.33,
    'MT': -0.50,
    'PA': 0.84,
    'PB': -0.08,
    'PE': -1.03,
    'PI': -1.23,
    'PR': 0.31,
    'RJ': 0.17,
    'RN': -0.33,
    'RO': -0.09,
    'RR': 1.00,
    'RS': 0.21,
    'SC': 0.01,
    'SE': -0.04,
    'SP': 0.65,
    'TO': 1.57
};


// carrega só o GeoJSON do Brasil
fetch('../../../map-states-local/brazil-states.geojson.txt')
    .then(r => r.json())
    .then(geojson => {
        L.geoJSON(geojson, {
            style: feature => {
                const uf = feature.properties.sigla;
                const valor = dados[uf] || 0;
                const cor = valor > 1
                    ? 'rgba(55, 0, 179, 1)'
                    : valor > 0
                        ? 'rgba(106, 0, 255, 1)'
                        : valor > -1
                            ? 'rgba(0, 112, 255, 1)'
                            : 'rgba(102, 178, 255, 1)';

                return {
                    color: '#333',
                    fillColor: cor,
                    weight: 1,
                    fillOpacity: 0.6
                };
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`${feature.properties.name}: ${dados[feature.properties.sigla] || 0}`);
            }
        }).addTo(map);

        // ajusta para caber só o Brasil
        map.fitBounds(L.geoJSON(geojson).getBounds());
    });


const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const dataValues = [3.45, 3.55, 3.76, 3.98, 4.28, 4.34, 4.43, 4.38, 4.39, 4.35, 4.13, 3.51];
const dataValuesMercado = [3.41, 3.69, 3.54, 3.62, 3.83, 3.84, 3.86, 3.83, 3.80, 3.79, 3.63, 3.35];

const ctx = document.getElementById('scoreChart').getContext('2d');

Chart.register(ChartDataLabels);

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'Nota média (Você)',
                data: dataValues,
                tension: 0.25,
                borderWidth: 2,
                borderColor: '#0b66c2',
                backgroundColor: 'rgba(11,102,194,0.08)',
                pointBackgroundColor: '#0b66c2',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                order: 2
            },
            {
                label: 'Nota média (Mercado)',
                data: dataValuesMercado,
                tension: 0.25,
                borderWidth: 2,
                borderColor: '#e0643a',
                backgroundColor: 'rgba(224,100,58,0.00)',
                pointBackgroundColor: '#e0643a',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                borderDash: [6, 4],
                order: 1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: { color: '#444', usePointStyle: true, padding: 16 }
            },
            title: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function (context) { return context[0].label; },
                    label: function (context) {
                        const value = context.parsed.y;
                        const label = context.dataset.label || '';
                        return `${label}: ${value.toFixed(2)}`;
                    }
                }
            },
            datalabels: {
                display: function (context) {
                    return context.dataIndex === context.dataset.data.length - 1;
                },
                align: 'end',
                anchor: 'end',
                offset: 0,
                formatter: function (value) { return value.toFixed(2); },
                font: { weight: '600', size: 11 },
                color: '#333'
            }
        },
        interaction: {
            mode: 'nearest',
            intersect: false
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#666' }
            },
            y: {
                min: 2.5,
                max: 5.0,
                ticks: {
                    stepSize: 0.5,
                    callback: function (value) { return Number(value).toFixed(2); },
                    color: '#666'
                },
                grid: { color: 'rgba(0,0,0,0.06)' }
            }
        },
        layout: { padding: { top: 10, bottom: 6, left: 0, right: 0 } }
    }
});

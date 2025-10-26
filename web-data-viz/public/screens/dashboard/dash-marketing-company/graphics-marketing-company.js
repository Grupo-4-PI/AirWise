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
const dados = { 'SP': 50, 'RJ': 30, 'MG': 20 };

// carrega só o GeoJSON do Brasil
fetch('../../../map-states-local/brazil-states.geojson.txt')
    .then(r => r.json())
    .then(geojson => {
        L.geoJSON(geojson, {
            style: feature => {
                const uf = feature.properties.sigla;
                const valor = dados[uf] || 0;
                const cor = valor > 40 ? 'red' : valor > 20 ? 'orange' : 'green';
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
const dataValuesMercado = [3.60, 3.50, 3.80, 4.05, 4.10, 4.20, 4.25, 4.30, 4.28, 4.15, 4.05, 3.95];

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

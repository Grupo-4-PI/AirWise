const map = L.map('map', {
    center: [-15.78, -47.93],
    zoom: 100,
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
fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
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



/* ----------------------------
   DADOS (formato original)
   ---------------------------- */
const DATA_RAW = [
    { group: 'Cobrança', qtd: 2706, tmf: 10.3 },
    { group: 'Vício de Qualid.', qtd: 2403, tmf: 13.7 },
    { group: 'Contrato / Acordo', qtd: 2011, tmf: 9.5 },
    { group: 'Atendimento', qtd: 1940, tmf: 10.0 },
    { group: 'Informação', qtd: 244, tmf: 11.0 },
    { group: 'Dados Pessoais', qtd: 114, tmf: 9.2 },
    { group: 'Saúde e Segurança', qtd: 41, tmf: 14.9 },
    { group: 'Entrega do Produto', qtd: 38, tmf: 12.4 }
];

/* ----------------------------
   TRANSFORMAÇÃO (pontos para scatter)
   cada ponto precisa ter x, y e um label (group)
   ---------------------------- */
const POINTS = DATA_RAW.map(item => ({ x: item.qtd, y: item.tmf, group: item.group }));

/* ----------------------------
   ESTATÍSTICAS SIMPLES (médias)
   ---------------------------- */
const MEAN_QTD = DATA_RAW.reduce((s, i) => s + i.qtd, 0) / DATA_RAW.length;
const MEAN_TMF = DATA_RAW.reduce((s, i) => s + i.tmf, 0) / DATA_RAW.length;

/* ----------------------------
   LIMITES DO EIXO (simples, fixos ou auto)
   aqui uso limites fixos pra ficar previsível no layout
   ajuste se quiser automático
   ---------------------------- */
const X_MIN = 0;
const X_MAX = 3500;
const Y_MIN = 8;
const Y_MAX = 17;

/* ----------------------------
   CRIA O GRÁFICO
   - dataset de pontos: mostra datalabels com o nome do grupo
   - datasets de linha: média vertical/horizontal sem datalabels
   ---------------------------- */
const ctx = document.getElementById('scatterChart').getContext('2d');

const scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: 'Grupos',
                data: POINTS,
                pointRadius: 8,
                pointHoverRadius: 10,
                backgroundColor: 'rgba(96,165,250,0.95)',
                // datalabels somente para este dataset (exibe o 'group')
                datalabels: {
                    display: true,
                    formatter: v => v.group,
                    anchor: 'end',
                    align: 'right',
                    color: 'black',
                    font: { size: 11, weight: 'bold' }
                }
            },
            // linha vertical — média da Qtd
            {
                label: `Média Qtd: ${MEAN_QTD.toFixed(2)}`,
                type: 'line',
                data: [
                    { x: MEAN_QTD, y: Y_MIN },
                    { x: MEAN_QTD, y: Y_MAX }
                ],
                borderColor: 'rgba(250,204,21,0.95)',
                backgroundColor: 'orange',
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [6, 6],
                datalabels: { display: false }
            },
            // linha horizontal — média do TMF
            {
                label: `Média TMF: ${MEAN_TMF.toFixed(2)}`,
                type: 'line',
                data: [
                    { x: X_MIN, y: MEAN_TMF },
                    { x: X_MAX, y: MEAN_TMF }
                ],
                borderColor: 'rgba(52,211,153,0.95)',
                backgroundColor: 'rgba(52,211,153,0.95)',
                borderWidth: 2,
                pointRadius: 0,
                borderDash: [6, 6],
                datalabels: { display: false }
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },

            // tooltip com label legível
            tooltip: {
                callbacks: {
                    label: ctx => {
                        const r = ctx.raw;
                        if (r && r.group) return `${r.group} — Qtd: ${r.x}, TMF: ${r.y}`;
                        return `${ctx.dataset.label}: x:${ctx.parsed.x}, y:${ctx.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: 'Qtd' },
                min: X_MIN,
                max: X_MAX,
                font: { weight: 'bold' }
            },
            y: {
                title: { display: true, text: 'Tempo médio de finalização' },
                min: Y_MIN,
                max: Y_MAX
            }
        }
    },
    // registra o plugin datalabels (já incluímos via CDN)
    plugins: [ChartDataLabels]
});

/* clique simples para mostrar detalhes (opcional) */
document.getElementById('scatterChart').addEventListener('click', (evt) => {
    const items = scatterChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
    if (!items.length) return;
    const it = items[0];
    const dataPoint = scatterChart.data.datasets[it.datasetIndex].data[it.index];
    alert(`${dataPoint.group || scatterChart.data.datasets[it.datasetIndex].label}\nQtd: ${dataPoint.x}\nTMF: ${dataPoint.y}`);
});
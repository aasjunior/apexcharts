let donutChart, lineChart, splineAreaChart, donutSeries, donutTotal, lineSeries, splineAreaSeries;
let selectedDonutSeriesIndex = null;

// Consumindo dados da API para o gráfico de rosca (donut)
fetch('http://localhost:8000/donut-chart/data')
    .then(response => response.json())
    .then(data => {
        donutSeries = data.donutSeries;
        donutTotal = donutSeries.reduce((a, b) => a + b, 0);
        donutChart = createDonutChart(
            "myDonutChart",
            donutSeries,
            data.donutLabels,
            data.donutColors
        );
		// Adicionando manipuladores de eventos aos gráficos
		donutChart.addEventListener(
			"dataPointSelection",
			function (event, chartContext, config) {
				crossFilterDonut(config);
			}
		);
    });

// Consumindo dados da API para o gráfico de linha
fetch('http://localhost:8000/line-chart/data')
    .then(response => response.json())
    .then(data => {
        lineSeries = data.lineSeries;
        lineChart = createLineChart(
            "myLineChart",
            lineSeries,
            data.lineCategories
        );
    });

// Consumindo dados da API para o gráfico de área spline
fetch('http://localhost:8000/spline-chart/data')
    .then(response => response.json())
    .then(data => {
        splineAreaSeries = data.splineAreaSeries;
        splineAreaChart = createSplineAreaChart(
            "mySplineAreaChart",
            splineAreaSeries,
            data.splineAreaCategories
        );
    });

// Aplicando o crosFilter ao selecionar a label do grafico donut
document.addEventListener("click", function (event) {
	const target = event.target;
	if (target.classList.contains("apexcharts-legend-text")) {
		const index = parseInt(target.getAttribute("rel"));
		crossFilterDonut({ dataPointIndex: index - 1 });
		selectedDonutSeriesIndex = null;
	}
});

function crossFilterDonut(config) {
	let formatter;
	let selectedSeriesName;

	// Verifica se o mesmo pedaço é clicado novamente
	if (
		selectedDonutSeriesIndex === config.dataPointIndex &&
		selectedDonutSeriesIndex !== null
	) {
		selectedDonutSeriesIndex = null;
		lineSeries.forEach((series, index) => {
			lineChart.showSeries(series.name);
			splineAreaChart.showSeries(series.name);
		});
		formatter = function (w) {
			return donutTotal;
		};
		selectedSeriesName = "Total";
	} else {
		const dataPointIndex = config.dataPointIndex;
		selectedDonutSeriesIndex = config.dataPointIndex;
		lineSeries.forEach((series, index) => {
			if (index !== dataPointIndex) {
				lineChart.hideSeries(series.name);
				splineAreaChart.hideSeries(series.name);
			} else {
				lineChart.showSeries(series.name);
				splineAreaChart.showSeries(series.name);
			}
		});

		formatter = function (w) {
			return donutSeries[dataPointIndex];
		};
		selectedSeriesName = lineSeries[dataPointIndex].name;
	}

	const plotOptions = createPlotOptions(formatter, selectedSeriesName);
	donutChart.updateOptions(plotOptions);
}

const createPlotOptions = (formatter, selectedSeriesName) => ({
	plotOptions: {
		pie: {
			donut: {
				labels: {
					show: true,
					total: {
						show: true,
						showAlways: true,
						label: selectedSeriesName,
						fontSize: "22px",
						fontFamily: "Helvetica, Arial, sans-serif",
						fontWeight: 600,
						color: "#373d3f",
						formatter: formatter,
					},
				},
			},
		},
	},
});

// Obter o elemento clicado no console
function getClickedElement() {
	// Obtém o elemento clicado
	const target = event.target;

	// Retorna o elemento clicado
	return target;
}

// Cria um ouvinte de evento global de clique
document.addEventListener("click", function (event) {
	// Obtém o elemento clicado
	const element = getClickedElement();

	// Executa a ação desejada
	console.log("Clicado em:", element);

	// Verifica se o clique foi dentro do gráfico
	if (
		!event.target.closest(".apexcharts-canvas") &&
		!event.target.classList.contains("apexcharts-legend-text")
	) {
		// Se o clique foi fora do gráfico, redefina o filtro
		selectedDonutSeriesIndex = null;
		lineChart.updateSeries(lineSeries);
		splineAreaChart.updateSeries(splineAreaSeries);
		const formatter = function (w) {
			return donutTotal;
		};
		const selectedSeriesName = "Total";
		const plotOptions = createPlotOptions(formatter, selectedSeriesName);
		donutChart.updateOptions(plotOptions);
	}
});

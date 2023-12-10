// Dados estáticos para o gráfico de rosca (donut)
const donutSeries = [466, 861, 182];
const donutLabels = ["Bom", "Mal", "Sem Resposta"];
const donutColors = ["#008FFB", "#00E396", "#FEB019"];
const donutTotal = donutSeries.reduce((a, b) => a + b, 0);

// Dados estáticos para o gráfico de linha
const lineSeries = [
	{
		name: "Bom",
		data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
		color: "#008FFB",
	},
	{
		name: "Mal",
		data: [20, 29, 37, 36, 44, 45, 50, 58, 63],
		color: "#00E396",
	},
	{
		name: "Sem Resposta",
		data: [10, 15, 23, 25, 28, 32, 38, 40, 48],
		color: "#FEB019",
	},
];
const lineCategories = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
];

// Dados estáticos para o gráfico de área spline
const splineAreaSeries = [
	{
		name: "Bom",
		data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
		color: "#008FFB",
	},
	{
		name: "Mal",
		data: [20, 29, 37, 36, 44, 45, 50, 58, 63],
		color: "#00E396",
	},
	{
		name: "Sem Resposta",
		data: [10, 15, 23, 25, 28, 32, 38, 40, 48],
		color: "#FEB019",
	},
];
const splineAreaCategories = [
	"2023-01-01",
	"2023-01-02",
	"2023-01-03",
	"2023-01-04",
	"2023-01-05",
	"2023-01-06",
	"2023-01-07",
	"2023-01-08",
	"2023-01-09",
	"2023-01-10",
	"2023-01-11",
	"2023-01-12",
	"2023-01-13",
	"2023-01-14",
	"2023-01-15",
	"2023-01-16",
	"2023-01-17",
	"2023-01-18",
	"2023-01-19",
	"2023-01-20",
	"2023-01-21",
	"2023-01-22",
	"2023-01-23",
	"2023-01-24",
	"2023-01-25",
	"2023-01-26",
	"2023-01-27",
	"2023-01-28",
	"2023-01-29",
	"2023-01-30",
	"2023-01-31",
];

// Criando os gráficos
const donutChart = createDonutChart(
	"myDonutChart",
	donutSeries,
	donutLabels,
	donutColors
);
const lineChart = createLineChart("myLineChart", lineSeries, lineCategories);
const splineAreaChart = createSplineAreaChart(
	"mySplineAreaChart",
	splineAreaSeries,
	splineAreaCategories
);

let selectedDonutSeriesIndex = null;

// Adicionando manipuladores de eventos aos gráficos
donutChart.addEventListener(
	"dataPointSelection",
	function (event, chartContext, config) {
		crossFilterDonut(config);
	}
);

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

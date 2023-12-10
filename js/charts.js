function createChart(elementId, series, labels, type) {
	// Verificando se o elemento existe
	var element = document.querySelector(`#${elementId}`);
	if (!element) {
		return;
	}
	// Opções para o gráfico
	var options = {
		chart: {
			type: type,
		},
		series: series,
		labels: labels,
	};

	// Criando o gráfico
	var chart = new ApexCharts(element, options);
	chart.render();
	return chart;
}

function createDonutChart(elementId, series, labels, colors) {
	// Verificando se o elemento existe
	var element = document.querySelector(`#${elementId}`);
	if (!element) {
		return;
	}

	// Calculando o total
	var total = series.reduce((a, b) => a + b, 0);

	// Opções para o gráfico
	var options = {
		chart: {
			type: "donut",
		},
		series: series,
		labels: labels,
		colors: colors,
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						total: {
							show: true,
							showAlways: true,
							label: "Total",
							fontSize: "22px",
							fontFamily: "Helvetica, Arial, sans-serif",
							fontWeight: 600,
							color: "#373d3f",
							formatter: function (w) {
								return total;
							},
						},
					},
				},
			},
		},
	};

	// Criando o gráfico
	var chart = new ApexCharts(element, options);
	chart.render();
	return chart;
}

function createLineChart(elementId, series, categories) {
	var element = document.querySelector(`#${elementId}`);
	if (!element) {
		return;
	}

	// Mapeando as cores das séries
	var colors = series.map((s) => s.color);

	var options = {
		chart: {
			type: "line",
			toolbar: {
				show: true,
				tools: {
					download: false,
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
			},
		},
		series: series,
		colors: colors, // Definindo as cores das séries
		xaxis: {
			categories: categories,
		},
	};

	var chart = new ApexCharts(element, options);
	chart.render();

	return chart;
}

function createSplineAreaChart(elementId, series, categories) {
	var element = document.querySelector(`#${elementId}`);
	if (!element) {
		return;
	}

	// Mapeando as cores das séries
	var colors = series.map((s) => s.color);

	var options = {
		chart: {
			type: "area",
			toolbar: {
				show: true,
				tools: {
					download: false,
					selection: false,
					zoom: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
			},
		},
		stroke: {
			curve: "smooth",
		},
		dataLabels: {
			enabled: false,
		},
		series: series,
		colors: colors, // Definindo as cores das séries
		xaxis: {
			type: "datetime",
			categories: categories,
		},
		tooltip: {
			x: {
				format: "dd/MM/yy HH:mm",
			},
		},
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 0.9,
				stops: [0, 100],
			},
		},
	};

	var chart = new ApexCharts(element, options);
	chart.render();

	return chart;
}

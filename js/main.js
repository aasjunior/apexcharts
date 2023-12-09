// Dados estáticos para o gráfico de rosca (donut)
var donutSeries = [466, 861, 182]
var donutLabels = ['Bom', 'Mal', 'Sem Resposta']
var donutColors = ['#008FFB', '#00E396', '#FEB019']
var donutTotal = donutSeries.reduce((a, b) => a + b, 0)

// Dados estáticos para o gráfico de linha
var lineSeries = [
  {
    name: "Bom",
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    color: '#008FFB'
  },
  {
    name: "Mal",
    data: [20, 29, 37, 36, 44, 45, 50, 58, 63],
    color: '#00E396'
  },
  {
    name: "Sem Resposta",
    data: [10, 15, 23, 25, 28, 32, 38, 40, 48],
    color: '#FEB019'
  }
]
var lineCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

// Criando os gráficos
var donutChart = createDonutChart('myDonutChart', donutSeries, donutLabels, donutColors)
var lineChart = createLineChart('myLineChart', lineSeries, lineCategories)
var selectedDonutSeriesIndex = null;

// Adicionando manipuladores de eventos aos gráficos
donutChart.addEventListener('dataPointSelection', function(event, chartContext, config) {
    crossFilterDonut(config)
})

// Aplicando o crosFilter ao selecionar a label do grafico donut
document.addEventListener('click', function(event) {
    const target = event.target;
    if(target.classList.contains('apexcharts-legend-text')){
        const index = parseInt(target.getAttribute('rel'));
        crossFilterDonut({dataPointIndex: index - 1})
        selectedDonutSeriesIndex = null
    }
});

function crossFilterDonut(config){
    var formatter = function(w){
        return donutTotal
    }
    var plotOptions = createPlotOptions(formatter,"Total")

    // Verifica se o mesmo pedaço é clicado novamente
    if(selectedDonutSeriesIndex === config.dataPointIndex && selectedDonutSeriesIndex !== null){
        selectedDonutSeriesIndex = null
        lineChart.updateSeries(lineSeries)
        plotOptions = createPlotOptions(formatter,"Total")
    }else{
        var dataPointIndex = config.dataPointIndex
        selectedDonutSeriesIndex = config.dataPointIndex
        var selectedSeriesName = lineSeries[dataPointIndex].name
        var selectedSeries = lineSeries.find(s => s.name === selectedSeriesName)
        lineChart.updateSeries([selectedSeries])
        formatter = function (w) {
            return donutSeries[dataPointIndex]
        }
        plotOptions = createPlotOptions(formatter, selectedSeriesName)
    }
    
    donutChart.updateOptions(plotOptions)
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
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: formatter
                    }
                }
            }
        }
    }
})
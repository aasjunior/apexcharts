// Dados estáticos para o gráfico de rosca (donut)
var donutSeries = [466, 861, 182]
var donutLabels = ['Bom', 'Mal', 'Sem Resposta']
var donutColors = ['#008FFB', '#00E396', '#FEB019']

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
    // Verifique se o mesmo pedaço é clicado novamente
    if(selectedDonutSeriesIndex === config.dataPointIndex && selectedDonutSeriesIndex !== null){
        console.log("Clicado de novo " + selectedDonutSeriesIndex);
        selectedDonutSeriesIndex = null
        lineChart.updateSeries(lineSeries)
    }else{
        var dataPointIndex = config.dataPointIndex
        
        selectedDonutSeriesIndex = config.dataPointIndex
        var selectedSeriesName = lineSeries[dataPointIndex].name
        var selectedSeries = lineSeries.find(s => s.name === selectedSeriesName)
        console.log(selectedSeries);
        lineChart.updateSeries([selectedSeries])
    }
})
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

// Adicionando manipuladores de eventos aos gráficos
donutChart.addEventListener('dataPointSelection', function(event, chartContext, config){
  var seriesIndex = config.seriesIndex
  var dataPointIndex = config.dataPointIndex
  var selectedSeriesName = lineSeries[dataPointIndex].name
  console.log(dataPointIndex)
  console.log(selectedSeriesName)
  
  // Atualiza o gráfico de linha para mostrar apenas a série selecionada
  var selectedSeries = lineSeries.find(s => s.name === selectedSeriesName)
  console.log(selectedSeries);
  lineChart.updateSeries([selectedSeries])
})

lineChart.addEventListener('dataPointSelection', function(event, chartContext, config){
  var seriesIndex = config.seriesIndex
  var dataPointIndex = config.dataPointIndex
  var selectedSeriesName = lineSeries[seriesIndex].name
  console.log(selectedSeriesName)

  // Atualiza o gráfico de rosca para mostrar apenas a série selecionada
  var selectedSeriesIndex = donutLabels.indexOf(selectedSeriesName)
  var selectedSeriesValue = donutSeries[selectedSeriesIndex]
  donutChart.updateSeries([selectedSeriesValue])
})

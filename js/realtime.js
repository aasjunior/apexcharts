let lineChart;
/*
async function fetchData() {
    try {
        const response = await fetch('http://localhost:8000/realtime/data');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        lineSeries = data.lineSeries;
        lineCategories = data.lineCategories;
        if (!lineChart) {
            // Cria o gráfico uma vez
            lineChart = createLineChart(
                "realTimeLineChart",
                lineSeries,
                lineCategories
            );
        } else {
            // Atualiza os dados do gráfico
            lineChart.updateSeries(lineSeries);
            lineChart.updateOptions({ xaxis: { categories: lineCategories } });
        }
        fetchData();
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
}
*/
// Chama a função fetchData a cada 5 segundos para atualizar o gráfico
// setInterval(fetchData, 5000);

let socket = new WebSocket("ws://localhost:8000/realtime");

socket.onopen = function(e) {
    console.log("[open] Conexão estabelecida");
    console.log("Enviando para o servidor");
};

socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    lineSeries = data.lineSeries;
    lineCategories = data.lineCategories;
    if (!lineChart) {
        // Cria o gráfico uma vez
        lineChart = createLineChart(
            "realTimeLineChart",
            lineSeries,
            lineCategories
        );
    } else {
        // Atualiza os dados do gráfico
        lineChart.updateSeries(lineSeries);
        lineChart.updateOptions({ xaxis: { categories: lineCategories } });
    }
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log(`[close] Conexão fechada limpa, código=${event.code} motivo=${event.reason}`);
    } else {
        console.log('[close] Conexão morreu');
    }
};

socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
};

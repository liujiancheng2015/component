window.onload = () => {
    const hsData = [
        ["Java", "1", "降", "-0.01%"],
        ["C", "2", "升", "+2.44%"],
        ["Python", "3", "升", "+1.41%"],
        ["C++", "4", "降", "-2.58%"],
        ["C#", "5", "升", "+2.07%"],
        ["VB .NET", "6", "降", "-1.17%"],
        ["JavaScript", "7", "降", "-0.85%"]
    ]

    const hot = new Handsontable(document.querySelector("#handsontable"), {
        data: hsData,
        width: '100%',
        className: "htCenter htMiddle",
        colHeaders: ["语言名称", "排名", "升或降", "变化幅度"],
        fixedRowsTop: 1,
        colWidths: 150,
        rowHeights: 35
    });

    const echartsOption = {
        title: {
            text: 'JavaScript语言排名变化'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: ["2000","2005","2010","2015","2020"]
        },
        yAxis: {},
        series: [{
            name: '排名',
            type: 'line',
            data: [6, 9, 8, 8, 7]
        }]
    };

    const myEcharts = echarts.init(document.querySelector("#myEcharts"));
    myEcharts.setOption(echartsOption);

}
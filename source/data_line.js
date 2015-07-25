// 使用
require(
    [
        'echarts',
        'echarts/chart/line'
    ],
    function (ec) {

        var myChart = ec.init(document.getElementById('line'));                                 
        
        option = {
            backgroundColor : 'rgb(255,255,255)',
            tooltip : {
                trigger: 'axis'
            },
            xAxis : [
                {
                    name : "月",
                    type : 'category',
                    boundaryGap : false,
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    name : "AQI",
                    splitNumber : 3,
                    type : 'value',
                    axisLabel : {
                        formatter: '{value}'
                    }
                }
            ],
            series : [
                {
                    name:'AQI',
                    type:'line',
                    data:[100, 154, 139, 89, 162, 130, 150, 190, 230, 210, 190,178],
                    itemStyle : {
                         normal: {
                            color : 'rgb(47,166,214)'
                        },
                        emphasis: {
                            color : 'rgb(59,95,165)'
                        }
                    },
                }
            ]
        };
                    
                    
                    
            
        // 为echarts对象加载数据 
        myChart.setOption(option); 
    }
);
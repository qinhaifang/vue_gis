<template>
    <div>
        <div class="m1">
            <div id="shuju" style="width: 300px;height: 360px"></div>
        </div>
        <div class="m2">
            <div id="baojing" style="width: 300px;height: 360px"></div>
        </div>

        <div class="moduletwo">
            <div class="d1">
                <div id="myChart" style="width: 300px;height: 360px;"></div>
            </div>
            <div class="d2">
                <div id="chanliang" style="width: 300px;height: 360px"></div>
            </div>
        </div>


    </div>
</template>

<script>
    // import ces from "./CesiumExample/No01-init"
    export default {
        components: {
            // ces
        },
        mounted() {
            this.drawLine();
            this.shuju();
            this.baojing();
            this.chanliang();

            // this.$initCesium.tabcesium(["fengLiu"]);
            this.$initOL.loadLayer(["WMTSLayer", "groundBuilding", "groundBorder", "riskground"]);
            this.$initOL.viewFlyTo({// ground
                lng: 112.284780552,
                lat: 36.841365671,
                zoom: 16
            });

        },
        methods: {
            drawLine() {
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: {text: '在Vue中使用echarts'},
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            shuju() {
                let myChart = this.$echarts.init(document.getElementById('shuju'))
                myChart.setOption({
                    title: {text: '安全报警分析'},
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                })
            },
            baojing() {
                let myChart = this.$echarts.init(document.getElementById('baojing'));
                myChart.setOption({
                    title: {text: '设备报警分析'},
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        areaStyle: {}
                    }]
                })
            },
            chanliang() {
                let myChart = this.$echarts.init(document.getElementById('chanliang'));
                myChart.setOption({
                    title: {text: '产量统计分析'},
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                    }]
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
    }

    .m1 {
        width: 300px;
        height: 360px;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        opacity: 0.9;
        position: absolute;
        left: 50px;
        top: 50px;
        z-index: 2;
    }

    .m2 {
        width: 300px;
        height: 360px;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        opacity: 0.9;
        position: absolute;
        left: 50px;
        top: 426px;
        z-index: 2;
    }

    .moduletwo {
        position: absolute;
        right: 0;
        top: 0;
    }

    .d1 {
        width: 300px;
        height: 360px;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        opacity: 0.9;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 50px;
        z-index: 2;
    }

    .d2 {
        width: 300px;
        height: 360px;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        opacity: 0.9;
        right: 0;
        top: 426px;
        position: absolute;
        z-index: 2;
    }
</style>
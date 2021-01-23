

<template>
    <div :style="{ 'max-width': '700px'}">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
    import {Chart} from 'highcharts-vue'

    export default {
        name: 'debug',
        components: {
            highcharts: Chart
        },
        data() {
            return {
                chartOptions: {
                    series: [
                        {
                            data: [1,2,3] // sample data
                        },
                        {
                            name: 'test',
                            data: [3,1,2] // sample data
                        }
                    ],
                    chart: {
                        height: 700,
                    },                }
            }
        }
    }
</script>
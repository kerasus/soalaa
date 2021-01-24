

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
                            color: 'red',
                            data: [3,1,2] // sample data
                        }
                    ],
                    chart: {
                        height: 700,
                    },
                    title: {
                        text: 'Solar Employment Growth by Sector, 2010-2016'
                    },
                    subtitle: {
                        text: 'Source: thesolarfoundation.com'
                    },
                    credits: {
                        text: '3a.alaatv.com',
                        href: 'https://www.3a.alaatv.com'
                    },
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'درصد'
                        }
                    },
                    xAxis: {
                        accessibility: {
                            rangeDescription: 'Range: 2010 to 2017'
                        }
                    },
                }
            }
        }
    }
</script>
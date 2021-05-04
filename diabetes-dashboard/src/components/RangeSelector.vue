<template>
    <div class="ranger">
        <canvas id="chartJSContainer"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';
import 'chartjs-plugin-boxselect/dist/chartjs-plugin-boxselect.js'

export default {
    name: 'ranger',
    data() {
        return {
            options: {
                type: 'line',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [
                        {
                            label: '# of Votes',
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1
                        },
                        {
                            label: '# of Points',
                            data: [7, 11, 5, 8, 3, 7],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                reverse: false
                            }
                        }]
                    },
                    plugins: {
                        boxselect: {
                            select: {
                                enabled: true,
                                direction: 'xy',
                                selectboxBackgroundColor: 'rgba(0,0,0,0.15)',
                                selectboxBorderColor: 'rgba(0,0,0,0.15)'
                            },
                            callbacks: {
                                beforeSelect: function() {
                                    return false;
                                }
                            }
                        },
                    }
                }
            },
            startIndex: 0
        }
    },
    mounted() {
        const ctx = document.getElementById('chartJSContainer');
        const chart = new Chart(ctx, this.options);

        ctx.addEventListener('pointerdown', evt => {
            const points = chart.getElementsAtEventForMode(evt, 'index', {
                intersect: false
            });
            this.startIndex = points[0]._index;
        });

        ctx.addEventListener('pointerup', evt => {
            const points = chart.getElementsAtEventForMode(evt, 'index', {
                intersect: false
            });
            console.log('implement filter between ' + this.options.data.labels[this.startIndex] + ' and ' + this.options.data.labels[points[0]._index]);  
        });
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
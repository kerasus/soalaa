<template>
        <v-card class="infoCard infoText align-content-center" :elevation="0">
            <v-row class="infoHeight">
                <v-col class="infoCols">
                    نام و نام خانوادگی :
                    {{ user.first_name }}
                    {{ user.last_name }}
                </v-col>
                <v-col class="infoCols">
                    رشته :
                    {{ user.major.title }}
                </v-col>
                <v-col class="infoCols">
                    مقطع :
                    {{ user.grade.title }}
                </v-col>
                <v-col v-if="report.location.province" class="infoCols">
                    استان :
                    {{ report.location.province }}
                </v-col>
                <v-col v-if="report.location.city" class="infoCols">
                    شهر :
                    {{ report.location.city }}
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
    import {mixinAuth} from '@/mixin/Mixins'

    export default {
        name: "info",
        mixins: [mixinAuth],
        props: ['report']
    }
</script>

<style scoped>
    .infoCard {
        border-radius: 15px;
    }
    .infoCols {
        text-align: center;

    }
    .infoHeight{
        height: 50%;
        margin: inherit;
    }
    .infoText{
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);
    }
</style>

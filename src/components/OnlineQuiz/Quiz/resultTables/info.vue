<template>
        <v-card class="infoCard infoText align-content-center">
            <v-row class="infoHeight">
                <v-col class="infoCols">
                    نام و نام خانوادگی :
                    {{ user.first_name }}
                    {{ user.last_name }}
                </v-col>
                <v-col class="infoCols">
                    کد ملی :

                </v-col>
                <v-col class="infoCols">
                    شماره موبایل :
                    {{ user.mobile }}
                </v-col>
                <v-col class="infoCols">
                    رشته :
                    {{ user.major.name }}
                </v-col>
                <v-col class="infoCols">
                    استان :
                    {{ user.province }}
                </v-col>
                <v-col class="infoCols">
                    شهر :
                    {{ user.city }}
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
    import {mixinAuth} from '@/mixin/Mixins'

    export default {
        name: "info",
        mixins: [mixinAuth],
        data () {
            return {
                user: this.$store.getters.user
            }
        }
    }
</script>

<style scoped>
    .infoCard {
        /*margin-top: 10px;*/
        /*width: 97%;*/
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

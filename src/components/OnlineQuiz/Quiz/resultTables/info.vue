<template>
        <v-card class="infoCard infoText align-content-center">
            <v-row class="infoHeight">
                <v-col class="infoCols">
                    نام و نام خانوادگی :
                    {{ $store.getters.user.first_name }}
                    {{ $store.getters.user.last_name }}
                </v-col>
                <v-col class="infoCols">
                    کد ملی :

                </v-col>
                <v-col class="infoCols">
                    شماره موبایل :
                    {{ $store.getters.user.mobile }}
                </v-col>
                <v-col class="infoCols">
                    رشته :
                    {{ $store.getters.user.major.name }}
                </v-col>
                <v-col class="infoCols">
                    استان :
                    {{ $store.getters.user.province }}
                </v-col>
                <v-col class="infoCols">
                    شهر :
                    {{ $store.getters.user.city }}
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
    export default {
        name: "info",
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
        height: 80px;
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

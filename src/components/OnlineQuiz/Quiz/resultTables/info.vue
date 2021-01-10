<template>

        <v-card elevation="3" class="infoCard  infoText align-content-center">
            <v-row class="infoHeight">
                <v-col class="infoCols">
                    نام و نام خانوادگی : هلیا محمدی
                </v-col>
                <v-col class="infoCols">
                    کد ملی : 0020890222
                </v-col>
                <v-col class="infoCols">
                    شماره موبایل : 09365491835
                </v-col>
                <v-col class="infoCols">
                    رشته : ریاضی
                </v-col>
                <v-col class="infoCols">
                    استان : البرز
                </v-col>
                <v-col class="infoCols">
                    شهر : کرج
                </v-col>
            </v-row>
        </v-card>

</template>

<script>
    export default {
        name: "info"
    }
</script>

<style scoped>
    .infoCard {
        margin-top: 10px;
        width: 90%;
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

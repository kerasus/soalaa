<template>
    <div>

        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="red lighten-2"
                        dark
                        fab
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon>
                        mdi-alert-circle
                    </v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    ثبت خطا
                </v-card-title>

                <v-card-text>
                    <error-report @clicked="onClickErrorSend" :items="items"/>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                    >
                        انصراف
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

<v-btn @click="generateReport">دانلود pdf</v-btn>
        <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="true"
                :paginate-elements-by-height="1400"
                :pdf-quality="2"
                :manual-pagination="false"
                pdf-format="a4"
                pdf-orientation="landscape"
                pdf-content-width="800px"
                ref="html2Pdf"
        >
            <section slot="pdf-content">
test
            </section>
        </vue-html2pdf>


    </div>
</template>

<script>
    import ErrorReport from "@/components/errorReport";
    import VueHtml2pdf from 'vue-html2pdf'

    export default {
        name: "lessonDetails",
        components: {ErrorReport,VueHtml2pdf},

        data: () => ({
            dialog: false,
            items: [
                'خارج از بودجه بندی آزمون ',
                'خارج از چارچوب کتاب درسی',
                'دارای غلط تایپی'
            ],
        }),
        methods:{
            onClickErrorSend (value) {
                console.log(value)
            },
            generateReport () {
                this.$refs.html2Pdf.generatePdf()
            }
        }
    }
</script>

<style scoped>

</style>

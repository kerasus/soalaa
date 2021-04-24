<template>
    <div>
        <v-data-table
            :headers="tableHeaders"
            :items="tableData.data"
            :options.sync="options"
            :server-items-length="perPage"
            :loading="loadingTable"
            class="elevation-1"
        />
    </div>
</template>

<script>


    export default {
        name: 'debug',
        data () {
            return {
                options: {},
                tableHeaders: [
                    {
                        text: 'fdfsdfsdfsdfas',
                        sortable: true,
                        value: 'title'
                    }
                ],
                loadingTable: false,
                perPage: 0,
                tableData: {
                    "data": [
                        {
                            "id": 1084,
                            "redirect_url": null,
                            "title": "پاسخنامه تصویری آزمون سه آ روانشناسی با تدریس منوچهر ستینه",
                            "short_title": "روانشناسی",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/set_3a2_pt_ravanshenasi_20210416135611.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1084",
                                "api": "https://alaatv.com/api/v2/set/1084"
                            },
                            "contents_count": 3,
                            "author": {
                                "id": 1071397,
                                "first_name": "گروه آموزشی",
                                "last_name": "سه آ",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/Logo (3)_20210111085318.png?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-04-10 07:37:16",
                            "updated_at": "2021-04-16 09:26:12"
                        },
                        {
                            "id": 1083,
                            "redirect_url": null,
                            "title": "پاسخنامه تصویری آزمون سه آ زمین شناسی با تدریس رضا ملکان پور",
                            "short_title": "زمین شناسی",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/set_3a2_pt_zaminshenasi_20210416135647.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1083",
                                "api": "https://alaatv.com/api/v2/set/1083"
                            },
                            "contents_count": 3,
                            "author": {
                                "id": 1071397,
                                "first_name": "گروه آموزشی",
                                "last_name": "سه آ",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/Logo (3)_20210111085318.png?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-04-10 01:34:14",
                            "updated_at": "2021-04-16 09:26:48"
                        },
                        {
                            "id": 1059,
                            "redirect_url": null,
                            "title": "مشاوره تصویری درسی تفتان",
                            "short_title": "مشاوره",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/taftan moshavere bg_20210319152544.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1059",
                                "api": "https://alaatv.com/api/v2/set/1059"
                            },
                            "contents_count": 13,
                            "author": {
                                "id": 37214,
                                "first_name": "محمد رضا",
                                "last_name": "حسینی فرد",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/286003rxdf.mp4_snapshot_00.00.05.000_20190817083939.jpg?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-03-19 05:00:19",
                            "updated_at": "2021-03-19 11:57:38"
                        },
                        {
                            "id": 1047,
                            "redirect_url": null,
                            "title": "خط به خط ادبیات هفتم (نظام آموزشی جدید) (1400-1399) رضا اسکندری",
                            "short_title": "خط به خط ادبیات هفتم",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/adabiat7_kh_set_20210315122639.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1047",
                                "api": "https://alaatv.com/api/v2/set/1047"
                            },
                            "contents_count": 8,
                            "author": {
                                "id": 1153162,
                                "first_name": "رضا",
                                "last_name": "اسکندری",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/default_avatar.jpg?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-03-02 05:53:35",
                            "updated_at": "2021-04-07 11:23:40"
                        },
                        {
                            "id": 1043,
                            "redirect_url": null,
                            "title": "صفر تا صد ادبیات دوازدهم (نظام آموزشی جدید) (1400-1399) عبدالرضا مرادی",
                            "short_title": null,
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/adabiat12_0100_set2_20210221094217.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1043",
                                "api": "https://alaatv.com/api/v2/set/1043"
                            },
                            "contents_count": 22,
                            "author": {
                                "id": 37208,
                                "first_name": "عبدالرضا",
                                "last_name": "مرادی",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/moradi_20200920065725.jpg?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-02-15 03:34:55",
                            "updated_at": "2021-02-24 13:36:17"
                        },
                        {
                            "id": 1042,
                            "redirect_url": null,
                            "title": "خط به خط ریاضی هفتم (نظام آموزشی جدید) (1400-1399) رضا موحد",
                            "short_title": "خط به خط ریاضی هفتم",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/riazi7_kh_set_20210221094207.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1042",
                                "api": "https://alaatv.com/api/v2/set/1042"
                            },
                            "contents_count": 32,
                            "author": {
                                "id": 1105773,
                                "first_name": "رضا",
                                "last_name": "موحد",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/movahed_20210302090106.jpg?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-02-11 04:26:32",
                            "updated_at": "2021-03-02 05:49:52"
                        },
                        {
                            "id": 1041,
                            "redirect_url": null,
                            "title": "صفر تا صد دین و زندگی یازدهم (نظام آموزشی جدید) (1400-1399) هادی ناصری",
                            "short_title": "دین و زندگی یازدهم",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/dini11_0100_set_20210131100637.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1041",
                                "api": "https://alaatv.com/api/v2/set/1041"
                            },
                            "contents_count": 18,
                            "author": {
                                "id": 287450,
                                "first_name": "هادی",
                                "last_name": "ناصری",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/AXIS V5915_2020-05-19_16_00_47_018_20200520105240.jpg?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-01-26 03:21:47",
                            "updated_at": "2021-01-31 06:36:38"
                        },
                        {
                            "id": 1038,
                            "redirect_url": null,
                            "title": "پاسخنامه تصویری آزمون سه آ شیمی با تدریس احسان گودرزی",
                            "short_title": "شیمی",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/set_3a2_pt_shimi_20210416133758.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1038",
                                "api": "https://alaatv.com/api/v2/set/1038"
                            },
                            "contents_count": 12,
                            "author": {
                                "id": 1071397,
                                "first_name": "گروه آموزشی",
                                "last_name": "سه آ",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/Logo (3)_20210111085318.png?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-01-11 09:00:03",
                            "updated_at": "2021-04-16 09:07:59"
                        },
                        {
                            "id": 1037,
                            "redirect_url": null,
                            "title": "پاسخنامه تصویری آزمون سه آ ریاضی تجربی با تدریس محمد مصطفی ابراهیمی",
                            "short_title": "ریاضی تجربی",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/set_3a2_pt_riazit_20210416134152.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1037",
                                "api": "https://alaatv.com/api/v2/set/1037"
                            },
                            "contents_count": 8,
                            "author": {
                                "id": 1071397,
                                "first_name": "گروه آموزشی",
                                "last_name": "سه آ",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/Logo (3)_20210111085318.png?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-01-11 08:59:27",
                            "updated_at": "2021-04-16 09:11:53"
                        },
                        {
                            "id": 1036,
                            "redirect_url": null,
                            "title": "پاسخنامه تصویری آزمون سه آ-فیزیک رشته ریاضی با تدریس البرز امینیان",
                            "short_title": "فیزیک رشته ریاضی",
                            "photo": "https://cdn.alaatv.com/upload/contentset/departmentlesson/set_3a2_pt_fizikr_20210416134300.jpg",
                            "url": {
                                "web": "https://alaatv.com/set/1036",
                                "api": "https://alaatv.com/api/v2/set/1036"
                            },
                            "contents_count": 10,
                            "author": {
                                "id": 1071397,
                                "first_name": "گروه آموزشی",
                                "last_name": "سه آ",
                                "photo": "https://cdn.alaatv.com/upload/images/profile/Logo (3)_20210111085318.png?w=100&h=100"
                            },
                            "contents": null,
                            "created_at": "2021-01-11 05:19:53",
                            "updated_at": "2021-04-16 09:13:02"
                        }
                    ],
                    "meta": {
                        "count": 10,
                        "current_page": 1,
                        "from": 1,
                        "last_page": 29,
                        "path": "https://alaatv.com/api/v2/set",
                        "per_page": 10,
                        "to": 10,
                        "total": 284
                    },
                    "links": {
                        "first": "https://alaatv.com/api/v2/set?enable=1&display=1&contentsetPage=1",
                        "last": "https://alaatv.com/api/v2/set?enable=1&display=1&contentsetPage=29",
                        "prev": null,
                        "next": "https://alaatv.com/api/v2/set?enable=1&display=1&contentsetPage=2"
                    }
                }
            }
        },
        components: {

        },
        methods: {
            getDataFromApi () {
                this.loading = true
                this.fakeApiCall().then(data => {
                    this.desserts = data.items
                    this.totalDesserts = data.total
                    this.loading = false
                })
            },
        },
        watch: {
            options: {
                handler () {
                    this.getDataFromApi()
                },
                deep: true,
            },
        },
        mounted () {

        },
        created() {
            // this.tableData = JSON.parse(this.tableData)
            this.perPage = this.tableData.meta.total
            this.options.itemsPerPage = this.tableData.meta.count
            console.log(this.perPage)
        }
    }
</script>

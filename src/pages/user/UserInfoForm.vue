<template>
    <div class="wrapper">
        <v-row>
            <v-col cols="4">
                <div class="form-group m-form__group">
                    <v-text-field outlined label="نام" v-model="user.first_name"></v-text-field>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group">
                    <v-text-field outlined label=" نام خانوادگی" v-model="user.last_name"></v-text-field>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select :items="genders" label="جنسیت" outlined v-model="user.gender">
                    </v-select>
                </div>
            </v-col>
            <v-col cols="6">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="استان" v-model="user.province"></v-text-field>
                </div>
            </v-col>
            <v-col cols="6">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="شهر" v-model="user.city"></v-text-field>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="مدرسه" v-model="user.school"></v-text-field>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select label="رشته" :items="field" outlined v-model="user.major.id"></v-select>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select label="رشته" :items="level" outlined v-model="user.major.id"></v-select>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>

                <v-btn v-if="!waiting" @click="sendCode">
                    دریافت کد فعالسازی
                </v-btn>
                <div v-if="waiting">
                <div>
                    <span>{{ Math.floor(((totalTime) % 3600) / 60)}}</span>
                    <span>:</span>
                    <span>{{ ((totalTime) % 3600)  % 60 }}</span>

                </div>
                    کد ارسال شده را وارد نمایید.
                </div>
            </v-col>
            <v-col>
                <v-text-field label="کد فعالسازی" v-model="typedCode">

                </v-text-field>
            </v-col>
            <v-col>
                <v-btn v-if="waiting" @click="verifyCode">
                    ثبت شماره موبایل
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                        @click="submit"
                >ذخیره
                </v-btn>

            </v-col>
        </v-row>

    </div>

</template>

<script>

    import axios from "axios";

    export default {
        name: "UserInfoForm",
        props: {
            requiredItems: {
                type: Array
            },
        },
        data() {
            return {
                mobileVerify:null,
                timer: null,
                totalTime: (3 * 60 ),
                minutes: null,
                seconds:null,
                resetButton: false,
                typedCode: null,
                code: null,
                waiting: false,
                userInfoInForm: {},
                submitMessage: [],
                firstNameDisabled: false,
                lastNameDisabled: false,
                genders: [
                    {
                        id: 0,
                        name: 'نامشخص'
                    },
                    {
                        id: 1,
                        name: 'آقا'
                    },
                    {
                        id: 2,
                        name: 'خانم'
                    }
                ],
                field: ['انسانی', 'تجربی', 'ریاضی'],
                level: ['هفتم', 'هشتم', 'نهم', 'دهم', 'یازدهم', 'دوازدهم', 'فارغ التحصیل نظام جدید', 'فارغ التحصیل نظام قدیم']
            }
        },
        watch: {},
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        methods: {
            startTimer() {
                this.timer = setInterval(() => this.countdown(), 1000);

            },
            countdown: function() {
                if (this.totalTime > 0) {
                    this.totalTime--;
                } else {
                    this.waiting = false
                }
            },

            submit() {
                delete this.user.photo
                this.user.update()
                    .then((response) => {
                        console.log('response', response)
                    })
                // if (this.user.mobile_verified_at !== null) {
                //     this.$router.push('/آزمون_های_سه_آ')
                // }
            },
            sendCode() {
                this.waiting = true
                let sendVerifyCodeRoute = '/alaa/api/v2/mobile/resend'
                axios.get(sendVerifyCodeRoute).then(resp => {
                    this.code = resp
                })
                this.startTimer()
            },
            verifyCode() {
                let verifyCodeRoute = '/alaa/api/v2/mobile/verify' // post
                axios.post(verifyCodeRoute, {
                    code: this.typedCode
                })
            },
            changeAppBarAndDrawer(state) {
                this.$store.commit('updateAppBar', state)
                this.$store.commit('updateDrawer', state)
            },
            canSubmit() {
                let status = true;

                if (!this.isValidString(this.user.first_name)) {
                    status = false;
                    this.submitMessage.push('نام خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.last_name)) {
                    status = false;
                    this.submitMessage.push('نام خانوادگی خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.province)) {
                    status = false;
                    this.submitMessage.push('استان خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.city)) {
                    status = false;
                    this.submitMessage.push('شهر خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.school)) {
                    status = false;
                    this.submitMessage.push('نام مدرسه خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.gender.id)) {
                    status = false;
                    this.submitMessage.push('جنسیت خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.major.id)) {
                    status = false;
                    this.submitMessage.push('رشته خود را مشخص کنید.');
                }
                if (!this.isValidString(this.user.grade.id)) {
                    status = false;
                    this.submitMessage.push('مقطع خود را مشخص کنید.');
                }

                return status;
            },
            // editUserInfo() {
            //
            //     if (!this.canSubmit()) {
            //         return;
            //     }
            //
            //     // mApp.block('.btnSubmitEvent', {
            //     //     type: "loader",
            //     //     state: "info",
            //     // });
            //
            //     // let that = this;
            //     this.user.updateType = 'profile';
            //     delete this.user.photo;
            //
            //     // this.user.update()
            //     //     .then(function (response) {
            //     //         if (response.errors) {
            //     //             // var message = data.error.message;
            //     //             // toastr.warning('خطای سیستمی رخ داده است.' + '<br>' + message);
            //     //         } else {
            //     //             let userData = response.data.data;
            //     //             that.$store.dispatch('updateUserInfo', new User(userData)).then(response => {
            //     //                 mApp.unblock('.btnSubmitEvent');
            //     //                 that.$emit('userInfoUpdated');
            //     //             }, error => {
            //     //                 window.location.reload();
            //     //             });
            //     //         }
            //     //     })
            //     //     .catch(function (error) {
            //     //         mApp.unblock('.btnSubmitEvent');
            //     //         toastr.error('مشکلی رخ داده است.');
            //     //         // Assist.handleErrorMessage(error);
            //     //     });
            // },
            isValidString(string) {
                return (typeof string !== 'undefined' && string !== null && string.toString().trim().length > 0);
            }
        },
        mounted: function () {
            // let sendVerifyCodeRoute = '/alaa/api/v2/mobile/resend'
            // axios.get(sendVerifyCodeRoute, {
            //
            // })


            // let verifyCodeRoute = '/alaa/api/v2/mobile/verify' // post
            // axios.post(verifyCodeRoute, {
            //     code: '75021'
            // })

            // this.user.first_name = 'ali'
            // delete this.user.photo
            // this.user.update()
            //     .then((response) => {
            //         console.log('response', response)
            //     })

            // let updateProfileRoute = '/alaa/api/v2/user/'+this.user.id
            // axios.put(updateProfileRoute, {
            //
            // })
            this.changeAppBarAndDrawer(false)
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 80%;
        margin: auto;
        margin-top: 30px;
        text-align: center;
    }

    .requiredItem {
        color: red;
    }
</style>

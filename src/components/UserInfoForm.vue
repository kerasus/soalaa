<template>

    <div class="wrapper">

        <v-row>
            <v-col cols="4">
                <div class="form-group m-form__group">
                    <v-text-field outlined label="نام" v-model="user.first_name"></v-text-field>
                    <!--                    <label>-->
                    <!--                        <span class="requiredItem" v-if="isRequired('first_name')">*</span>-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        نام-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <input type="text" class="form-control m-input m-input&#45;&#45;air" placeholder="نام" v-model="user.first_name" :disabled="firstNameDisabled">-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-user"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group">
                    <v-text-field outlined label=" نام خانوادگی" v-model="user.last_name"></v-text-field>
                    <!--                    <label>-->
                    <!--                        <span class="requiredItem" v-if="isRequired('last_name')">*</span>-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        نام خانوادگی-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <input type="text" class="form-control m-input m-input&#45;&#45;air" placeholder="نام خانوادگی" v-model="user.last_name" :disabled="lastNameDisabled">-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-user"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select :items="gender" label="جنسیت" outlined v-model="user.gender.id">
                    </v-select>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('gender')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        جنسیت-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <select class="form-control m-input m-input&#45;&#45;air" v-model="user.gender.id">-->
                    <!--                            <option value="0">نامشخص</option>-->
                    <!--                            <option value="1">آقا</option>-->
                    <!--                            <option value="2">خانم</option>-->
                    <!--                        </select>-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-user"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="6">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="استان" v-model="user.province"></v-text-field>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('province')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        استان-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <input type="text" class="form-control m-input m-input&#45;&#45;air" placeholder="استان" v-model="user.province">-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-location-arrow"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="6">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="شهر" v-model="user.city"></v-text-field>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('city')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        شهر-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <input type="text" class="form-control m-input m-input&#45;&#45;air" placeholder="شهر" v-model="user.city">-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-location-arrow"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-text-field outlined label="مدرسه" v-model="user.school"></v-text-field>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('school')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        مدرسه-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <input type="text" class="form-control m-input m-input&#45;&#45;air" placeholder="مدرسه" v-model="user.school">-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-university"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select label="رشته" :items="field" outlined v-model="user.major.id"></v-select>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('major')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        رشته-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <select class="form-control m-input m-input&#45;&#45;air" v-model="user.major.id">-->
                    <!--                            <option value="-">نامشخص</option>-->
                    <!--                            <option value="1" :selected="user.major.id === 1">ریاضی</option>-->
                    <!--                            <option value="2" :selected="user.major.id === 2">تجربی</option>-->
                    <!--                            <option value="3" :selected="user.major.id === 3">انسانی</option>-->
                    <!--                        </select>-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-graduation-cap"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
            <v-col cols="4">
                <div class="form-group m-form__group ">
                    <v-select label="رشته" :items="level" outlined v-model="user.major.id"></v-select>
                    <!--                    <label>-->
                    <!--&lt;!&ndash;                        <span class="requiredItem" v-if="isRequired('grade')">*</span>&ndash;&gt;-->
                    <!--                        <span class="requiredItem" >*</span>-->
                    <!--                        مقطع-->
                    <!--                    </label>-->
                    <!--                    <div class="m-input-icon m-input-icon&#45;&#45;left">-->
                    <!--                        <select class="form-control m-input m-input&#45;&#45;air" v-model="user.grade.id">-->
                    <!--                            <option value="-">نا مشخص</option>-->
                    <!--                            <option value="5" :selected="user.grade.id === 5">هفتم</option>-->
                    <!--                            <option value="6" :selected="user.grade.id === 6">هشتم</option>-->
                    <!--                            <option value="7" :selected="user.grade.id === 7">نهم</option>-->
                    <!--                            <option value="1" :selected="user.grade.id === 1">دهم</option>-->
                    <!--                            <option value="2" :selected="user.grade.id === 2">یازدهم</option>-->
                    <!--                            <option value="8" :selected="user.grade.id === 8">دوازدهم</option>-->
                    <!--                            <option value="9" :selected="user.grade.id === 9">فارغ التحصیل نظام جدید</option>-->
                    <!--                            <option value="10" :selected="user.grade.id === 10">فارغ التحصیل نظام قدیم</option>-->
                    <!--                        </select>-->
                    <!--                        <span class="m-input-icon__icon m-input-icon__icon&#45;&#45;left">-->
                    <!--                            <span>-->
                    <!--                                <i class="fa fa-graduation-cap"></i>-->
                    <!--                            </span>-->
                    <!--                        </span>-->
                    <!--                    </div>-->
                </div>
            </v-col>
        </v-row>
        <v-row>
            <div class="col">
                <!--                <div v-for="(item, index) in submitMessage" class="alert alert-danger alert-dismissible fade show" role="alert">-->
                <!--                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">-->
                <!--                    </button>-->
                <!--                    <strong>{{ item }}</strong>-->
                <!--                </div>-->
            </div>
        </v-row>
        <v-row>
            <v-col>
                <!--                <button type="button" class="btn btn-primary a&#45;&#45;full-width btnSubmitEvent" @click="editUserInfo">ذخیره</button>-->
                <v-btn>ذخیره</v-btn>
            </v-col>
        </v-row>
    </div>

</template>

<script>

    export default {
        name: "UserInfoForm",
        props: {
            requiredItems: {
                type: Array,
                // default: []
            },
        },
        data() {
            return {
                userInfoInForm: {},
                submitMessage: [],
                firstNameDisabled: false,
                lastNameDisabled: false,
                gender: ['نامشخص', 'خانم', 'آقا'],
                field: ['انسانی', 'تجربی', 'ریاضی'],
                level: ['هفتم', 'هشتم', 'نهم', 'دهم', 'یازدهم', 'دوازدهم', 'فارغ التحصیل نظام جدید', 'فارغ التحصیل نظام قدیم']
            }
        },
        watch: {},
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        methods: {
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

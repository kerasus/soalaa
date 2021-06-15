<template>
  <div class="logList">
    <log-item v-for="(item, index) in logs" :key="index" :log-data="item"></log-item>
  </div>
</template>

<script>
import LogItem from "@/components/QuestionBank/EditQuestion/Log/LogItem/LogItem";
import {LogList} from "@/models/Log";

export default {
  components: {
    LogItem
  },
  props: {
    logs: {
      type: LogList,
      default: new LogList([
        {
          causer: {
            id: 123,
            full_name: 'full_name'
          },
          comments: [
            {
              user: {
                id: 24,
                full_name: 'adfasdfsafd'
              },
              comment: 'sadfhkjashdfjasldkjf',
              created_at: 'afsdfd'
            }
          ],
          properties: {
            old: {
              status: {
                id: 1342143,
                display_title: 'fgsdfgdfgfsd'
              }
            },
            new: {
              status: {
                id: 1343,
                display_title: 'fg453242534sd'
              }
            }
          },
          created_at: '32131538546'
        },
        {
          causer: {
            id: 123,
            full_name: 'full_name'
          },
          comments: [
            {
              user: {
                id: 24,
                full_name: 'adfasdfsafd'
              },
              comment: 'sadfhkjashdfjasldkjf',
              created_at: 'afsdfd'
            }
          ],
          properties: {
            old: {
              status: {
                id: 1342143,
                display_title: 'fgsdfgdfgfsd'
              }
            },
            new: {
              status: {
                id: 1343,
                display_title: 'fg453242534sd'
              }
            }
          },
          created_at: '32131538546'
        },
        {
          causer: {
            id: 123,
            full_name: 'full_name'
          },
          comments: [
            {
              user: {
                id: 24,
                full_name: 'adfasdfsafd'
              },
              comment: 'sadfhkjashdfjasldkjf',
              created_at: 'afsdfd'
            }
          ],
          properties: {
            old: {
              status: {
                id: 1342143,
                display_title: 'fgsdfgdfgfsd'
              }
            },
            new: {
              status: {
                id: 1343,
                display_title: 'fg453242534sd'
              }
            }
          },
          created_at: '32131538546'
        },
        {
          causer: {
            id: 123,
            full_name: 'full_name'
          },
          comments: [
            {
              user: {
                id: 24,
                full_name: 'adfasdfsafd'
              },
              comment: 'sadfhkjashdfjasldkjf',
              created_at: 'afsdfd'
            }
          ],
          properties: {
            old: {
              status: {
                id: 1342143,
                display_title: 'fgsdfgdfgfsd'
              }
            },
            new: {
              status: {
                id: 1343,
                display_title: 'fg453242534sd'
              }
            }
          },
          created_at: '32131538546'
        },
        {
          causer: {
            id: 123,
            full_name: 'full_name'
          },
          comments: [
            {
              user: {
                id: 24,
                full_name: 'adfasdfsafd'
              },
              comment: 'sadfhkjashdfjasldkjf',
              created_at: 'afsdfd'
            }
          ],
          properties: {
            old: {
              status: {
                id: 1342143,
                display_title: 'fgsdfgdfgfsd'
              }
            },
            new: {
              status: {
                id: 1343,
                display_title: 'fg453242534sd'
              }
            }
          },
          created_at: '32131538546'
        }
      ]),
// {
//         return [
//           {
//             editor: 'شهاب عبادی',
//             date: '11/9/2020',
//             previousStatus: 'نمونه خوانی',
//             currentStatus: 'نیازمند ویرایش',
//             commnets: [
//               {
//                 author: 'شهاب عبادی',
//                 text: 'توی صورت سوال غلط املایی وجود داره لطفا اصلاح شههههههههههههه',
//                 date: '11/9/2020'
//               },
//               {
//                 author: 'سجاد شهلایی',
//                 text: 'موردی دیده نشد، متن سوال مطابق عکس دبیره',
//                 date: '11/9/2020'
//               },
//             ]
//           },
//           {
//             editor: 'مصطفی عبادی',
//             date: '11/9/2020',
//             previousStatus: 'ویرایش خوانی',
//             currentStatus: 'نمونه ویرایش',
//             commnets: [
//               {
//                 author: 'شهاب عبادی',
//                 text: 'توی صورت سوال غلط املایی وجود داره لطفا اصلاح شه',
//                 date: '11/9/2020'
//               },
//               {
//                 author: 'سجاد شهلایی',
//                 text: 'موردی دیده نشد، متن سوال مطابق عکس دبیره',
//                 date: '11/9/2020'
//               },
//             ]
//           }
//         ]
//       }
    }
  },
  name: "logList",
  data() {
    return {}
  }
}

</script>

<style scoped>
.logList {
  width: 100%;
}
</style>

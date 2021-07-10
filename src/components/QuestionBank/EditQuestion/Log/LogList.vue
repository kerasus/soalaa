<template>
  <div>
    <p class="mt-2 font-weight-medium">
      سابقه
    </p>
    <v-card
      flat
      class="rounded-card"
      max-height="1600"
    >
      <div class="logList">
        <log-item
          v-for="(item, index) in logs.list"
          :key="index"
          :log="item"
          @addComment="addComment"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import LogItem from "@/components/QuestionBank/EditQuestion/Log/LogItem/LogItem";
import {LogList} from "@/models/Log";

export default {
  name: "LogList",
  components: {
    LogItem
  },
  props: {
    logs: {
      type: LogList,
      default() {
        return new LogList([
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
        ])
      },
    }
  },
  data() {
    return {}
  },
  methods: {
    addComment (eventData) {
      this.$emit('addComment', eventData)
    }
  }
}

</script>

<style scoped>
.logList {
  width: 100%;
}
.rounded-card{
  border-radius: 10px;
  overflow-y: auto;
}
</style>

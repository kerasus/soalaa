<template>
  <q-tree
    class="q-ma-lg"
    :nodes="nodes"
    node-key="id"
    ref="tree"
    label-key="title"
    @lazy-load="onLazyLoadTree"
  >
    <template v-slot:default-header="prop ">
      <!--        <q-icon :name= "prop.node.icon "></q-icon>-->
      {{ prop.node.title }}
      <q-icon @click.stop @keypress.stop class="edit-btn " name="edit " @click="openEditMenu(prop.node) "/>
    </template>
  </q-tree>
  <q-dialog v-model="editDialog " persistent>
    <q-card class="q-pa-md ">
      <q-btn flat icon="close " color="red " v-close-popup @click="editDialog = false "/>
      <q-tabs
        v-model="tab "
        narrow-indicator
        dense
        align="justify "
      >
        <q-tab class="text-purple " name="edit " icon="edit " label="ویرایش "/>
        <q-tab class="text-orange " name="addNew " icon="add " label="اضافه کردن گره جدید "/>
        <q-tab class="text-red " name="delete " icon="delete " label="حذف "/>
      </q-tabs>
      <q-tab-panels v-model="tab " animated>
        <q-tab-panel name="edit ">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName "
            label="نام جدید "
          />
          <q-input
            class="q-ma-md"
            filled
            v-model="newOrder"
            label="ترتیب جدید "
          />
          <q-btn
            text
            color="green "
            :loading="loading "
            @click="editNode(selectedNode.id) "
          >
            ثبت
          </q-btn>
        </q-tab-panel>
        <q-tab-panel name="addNew ">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName"
            label="نام "
          />
          <q-input
            class="q-ma-md"
            filled
            v-model="newOrder"
            label="ترتیب "
          />
          <q-btn
            text
            color="green "
            :loading="loading "
            @click="addClicked() "
          >
            اضافه شود
          </q-btn>
        </q-tab-panel>
        <q-tab-panel name="delete ">
          <div class="text-subtitle1 ">آیا از حذف گرۀ " {{ selectedNode.name }} " اطمینان دارید؟</div>
          <q-btn
            color="red "
            :loading="loading "
            @click="deleteNode "
            class="q-mt-md "
          >
            حذف
          </q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: 'TreeStructure'
}
</script>

<style scoped>

</style>

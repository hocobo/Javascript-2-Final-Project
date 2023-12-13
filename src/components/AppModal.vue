<script>
app.appModalNextId = 1;
export default {
  name: "AppModal",
  props:{
    title:{
      type:String,
      default: 'Modal Title'
    },
    id: {
      type: String,
      default: 'appModal' + app.appModalNextId,
    }
  },
}
</script>

<template>
  <q-dialog>
    <q-card class="q-pa-md " role="document">
      <q-form  class="q-gutter-sm">
        <div class="modal-content">
          <div class="modal-header text-white q-pb-md">
            <slot name="header">
              <h4 class="modal-title fs-5" :id="id + '-modalTitle'">{{title}}</h4>

            </slot>
          </div>
          <div class="modal-body text-white">
            <slot></slot>
          </div>
          <div class="row modal-footer justify-evenly">
            <slot name="footer">
              <q-btn type="button" class="btn bg-dark text-white" v-close-popup >Cancel</q-btn>
              <q-btn type="submit" color="dark" v-close-popup>OK</q-btn>
            </slot>
          </div>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>
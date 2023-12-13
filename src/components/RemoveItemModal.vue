<script>
import Game from "@/models/UserGame";
import AppModal from "@/components/AppModal.vue";
import {db} from "@/firebase";
export default {
  name: "RemoveItemModal",
  components:{
    AppModal
  },
  props:{
    item:{
      type: Object,
      required: true,
    },
  },
  methods: {
    removeGameDb(){
      console.log(this.item.id);
      db.collection('games')
          .doc(this.item.id)
          .delete()
    }
  }
}
</script>

<template>
  <app-modal :title="item.name" :id="'delete' + item.priority.toString()" >
    <template #header>
      <h4 class="modal-title fs-5 text-danger" >Remove {{item.name}}?</h4>
    </template>
    <p class="text-white">Are you sure you want to remove game? Doing so will delete it permanently from your collection.</p>
    <template #footer>
      <q-btn type="button" v-close-popup>Close</q-btn>
      <q-btn type="submit" class=" removeHover" v-close-popup @click.prevent="removeGameDb">Yes, Remove Game</q-btn>
    </template>

  </app-modal>
</template>

<style scoped>

</style>
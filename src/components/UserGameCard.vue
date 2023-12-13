<script>
import EditItemModal from "@/components/EditItemModal.vue";
import RemoveItemModal from "@/components/RemoveItemModal.vue";
import UserGame from "@/models/UserGame";
import GameDecorator from "@/models/GameDecorator";

export default {
  name: "UserGameCard",
  components: {RemoveItemModal, EditItemModal},
  props: {
    item: {
      type: [Object, UserGame, GameDecorator],
      required: true,
    },

    getStars: {
      type: Function,
    },
    authUser: {required:true},
  },
}
</script>

<template>
  <div>
    <q-img class="card-img-top" :src="item.background_image"></q-img>
    <q-card-section class="column items-baseline">
      <div class="text-h6 text-white">{{item.name}}</div>
      <div>Genre: {{item.genres }} <br>
        Rating: <span v-html="getStars(item.rating, item.type)"></span></div>
    </q-card-section>
  </div>


    <q-card-actions align="around" >
      <q-btn v-if="item.isFavorite()" @click ="item.unfavoriteGame(item)" icon="fa-solid fa-2xl fa-heart" style="color: #f40101;"></q-btn>
      <q-btn v-else @click ="item.favoriteGame(item)" icon="fa-solid fa-2xl fa-heart" style="color: #fafafa;"></q-btn>
      <q-btn @click="item.editModal = true" icon="fa-regular fa-pen-to-square fa-2xl"></q-btn>
      <q-btn @click="item.removeModal = true" icon="fa-solid fa-trash fa-2xl" class="removeHover"></q-btn>
    </q-card-actions>
    <edit-item-modal v-model="item.editModal" :item="item"   :key="item.favorite"></edit-item-modal>
    <remove-item-modal v-model="item.removeModal" :item="item" ></remove-item-modal>

</template>

<style scoped>

</style>
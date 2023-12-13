<script>
// import UserGame from "@/models/UserGame";
// import Game from "@/models/Game";
import EditItemModal from "@/components/EditItemModal.vue";
import GameDetailsModal from "@/components/GameDetailsModal.vue";
import RemoveItemModal from "@/components/RemoveItemModal.vue";
import UserGameCard from "@/components/UserGameCard.vue";
import GameCard from "@/components/GameCard.vue";
import Game from "@/models/Game";
import UserGame from "@/models/UserGame";
import FirebaseGame from "@/models/FirebaseGame";
export default {
  name: "GameListItem",
  components: {
    UserGameCard,
    GameCard
  },
  props: {
    item: {
      type: [Object, Game, UserGame,FirebaseGame],
      required: true,
    },
    authUser: {required:true},
  },
  methods: {
    getStars:function(rating, itemType)
    {
      let solidStars = rating;
      let emptyStars = 0;

      emptyStars = 4 - rating;


      let starRating = '';
      for(solidStars; solidStars > 0; solidStars--){
        starRating += '<i class="fa-solid fa-star fa-sm" style="color: #ffdd00;"></i>';
      }
      for(emptyStars; emptyStars > 0; emptyStars--){
        starRating += '<i class="fa-solid fa-star fa-sm" style="color: #585656;"></i>'
      }
      return starRating;
    },
  },
  computed: {
    cardType(){

      return this.item.type + 'Card';
    }
  }
}
</script>

<template>

  <q-card class="my-card text-white column justify-between">
    <component :is="cardType"
               :item="item"
               :key="item.favorite"
               :authUser="authUser"
               :get-stars = getStars></component>
  </q-card>




</template>

<style scoped>

</style>